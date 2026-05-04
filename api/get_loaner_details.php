<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'db_connect.php';

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID is required"]);
    exit;
}

$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("SELECT * FROM dashboard WHERE id = ?");
    $stmt->execute([$id]);
    $loaner = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($loaner) {
        $loaner['loan_amount_raw'] = preg_replace('/[^0-9]/', '', $loaner['loan_amount']);
        echo json_encode($loaner);
    } else {
        echo json_encode(["error" => "Loaner not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
