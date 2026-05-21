<?php
require_once 'db_connect.php';

$loaner_id = $_GET['loaner_id'] ?? null;

if (!$loaner_id) {
    echo json_encode(["error" => "Loaner ID is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM dashboard WHERE id = ?");
    $stmt->execute([$loaner_id]);
    $loaner = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$loaner) {
        echo json_encode(["error" => "Loaner not found"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM transactions WHERE loaner_id = ? ORDER BY created_at DESC");
    $stmt->execute([$loaner_id]);
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "loaner" => $loaner,
        "transactions" => $transactions
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
