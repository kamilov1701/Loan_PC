<?php
require_once 'db_connect.php';

$uploadDir = 'uploads/loaners/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $loan_amount = $_POST['loan_amount'] ?? '';
    $start_date = $_POST['start_date'] ?? date('Y-m-d');
    $deadline = $_POST['deadline'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $status = $_POST['status'] ?? 'Active';
    $comment = $_POST['comment'] ?? '';
    
    $imagePath = '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $filename = bin2hex(random_bytes(16)) . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $dest_path = $uploadDir . $filename;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $imagePath = $dest_path;
        }
    }

    $casser_id = $_POST['casser_id'] ?? null;

    try {
        $stmt = $pdo->prepare("INSERT INTO dashboard (name, loan_amount, start_date, deadline, phone_number, image, status, comment, casser_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $loan_amount . " UZS", $start_date, $deadline, $phone_number, $imagePath, $status, $comment, $casser_id]);
        $loaner_id = $pdo->lastInsertId();

        if ($casser_id) {
            $stmtLog = $pdo->prepare("INSERT INTO logs (casser_id, action_type, details) VALUES (?, ?, ?)");
            $stmtLog->execute([$casser_id, 'added_loaner', "Added new debtor: $name ($loan_amount UZS)"]);
        }
        $stmtSync = $pdo->query("SELECT 
            SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as total,
            SUM(CASE WHEN status = 'Paid' THEN CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED) ELSE 0 END) as repaid
            FROM dashboard");
        $global_f = $stmtSync->fetch(PDO::FETCH_ASSOC);
        $pdo->prepare("UPDATE debts SET total_debt = ?, past_due_debt = ? WHERE id = 1")
            ->execute([(int)$global_f['total'], (int)$global_f['repaid']]);

        echo json_encode(["success" => true, "message" => "Loaner added successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
