<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $loan_amount = $_POST['loan_amount'] ?? '';
    $start_date = $_POST['start_date'] ?? '';
    $deadline = $_POST['deadline'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $status = $_POST['status'] ?? 'Active';
    $comment = $_POST['comment'] ?? '';
    
    if (!$id) {
        echo json_encode(["success" => false, "error" => "ID is required"]);
        exit;
    }

    $imagePath = $_POST['current_image'] ?? '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/loaners/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

        $fileName = $_FILES['image']['name'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
        $dest_path = $uploadDir . $newFileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $dest_path)) {
            $imagePath = $dest_path;
        }
    }

    try {
        if (!str_contains($loan_amount, 'UZS')) {
            $loan_amount = number_format((int)preg_replace('/[^0-9]/', '', $loan_amount), 0, '', ' ') . " UZS";
        }

        $stmt = $pdo->prepare("UPDATE dashboard SET name=?, loan_amount=?, start_date=?, deadline=?, phone_number=?, image=?, status=?, comment=? WHERE id=?");
        $stmt->execute([$name, $loan_amount, $start_date, $deadline, $phone_number, $imagePath, $status, $comment, $id]);
        
        $stmtSync = $pdo->query("SELECT 
            SUM(CAST(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', '') AS UNSIGNED)) as total,
            SUM(CASE WHEN status = 'Paid' THEN CAST(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', '') AS UNSIGNED) ELSE 0 END) as repaid
            FROM dashboard");
        $global_f = $stmtSync->fetch(PDO::FETCH_ASSOC);
        $pdo->prepare("UPDATE debts SET total_debt = ?, past_due_debt = ? WHERE id = 1")
            ->execute([(int)$global_f['total'], (int)$global_f['repaid']]);

        echo json_encode(["success" => true, "message" => "Loaner updated successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
