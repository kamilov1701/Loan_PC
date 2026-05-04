<?php
require_once 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT * FROM dashboard ORDER BY created_at DESC");
    $loaners = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($loaners);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
