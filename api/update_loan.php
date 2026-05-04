<?php
require_once 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$loaner_id = $data['loaner_id'] ?? null;
$amount = $data['amount'] ?? 0;
$type = $data['type'] ?? null;
$comment = $data['comment'] ?? '';

if (!$loaner_id || !$amount || !$type) {
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Get current amount
    $stmt = $pdo->prepare("SELECT loan_amount FROM dashboard WHERE id = ?");
    $stmt->execute([$loaner_id]);
    $current = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$current) {
        throw new Exception("Loaner not found");
    }

    // Parse amount from string like "2 500 000 UZS"
    $current_val = (int)preg_replace('/[^0-9]/', '', $current['loan_amount']);
    
    if ($type === 'Added') {
        $new_val = $current_val + $amount;
    } else {
        $new_val = $current_val - $amount;
    }

    // Format new amount back to string
    $new_amount_str = number_format($new_val, 0, '', ' ') . " UZS";

    $stmt = $pdo->prepare("UPDATE dashboard SET loan_amount = ? WHERE id = ?");
    $stmt->execute([$new_amount_str, $loaner_id]);

    $stmt = $pdo->prepare("INSERT INTO transactions (loaner_id, type, amount, comment) VALUES (?, ?, ?, ?)");
    $stmt->execute([$loaner_id, $type, $amount, $comment]);

    $casser_id = $data['casser_id'] ?? null;

    $stmt = $pdo->prepare("INSERT INTO logs (casser_id, action_type, details) VALUES (?, ?, ?)");
    
    $stmtName = $pdo->prepare("SELECT name FROM dashboard WHERE id = ?");
    $stmtName->execute([$loaner_id]);
    $loaner_name = $stmtName->fetchColumn();

    $action_text = ($type === 'Added' ? "Added Loan: " : "Reduced Loan: ") . number_format($amount) . " UZS. Client: " . $loaner_name;
    $stmt->execute([$casser_id, 'loan_update', $action_text]);

    $pdo->commit();

    $stmtSync = $pdo->query("SELECT 
        SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as total,
        SUM(CASE WHEN status = 'Paid' THEN CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED) ELSE 0 END) as repaid
        FROM dashboard");
    $global_f = $stmtSync->fetch(PDO::FETCH_ASSOC);
    $pdo->prepare("UPDATE debts SET total_debt = ?, past_due_debt = ? WHERE id = 1")
        ->execute([(int)$global_f['total'], (int)$global_f['repaid']]);

    echo json_encode(["success" => true, "new_amount" => $new_amount_str]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}
?>
