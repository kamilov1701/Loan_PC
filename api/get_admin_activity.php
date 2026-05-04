<?php
require_once 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$admin_id = $_GET['id'] ?? null;
$date = $_GET['date'] ?? date('Y-m-d');

if (!$admin_id) {
    echo json_encode(["success" => false, "error" => "Admin ID required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM dashboard 
                           WHERE casser_id = ? 
                           AND DATE(created_at) = ?
                           ORDER BY id DESC");
    $stmt->execute([$admin_id, $date]);
    $loans = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "loans" => $loans
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
