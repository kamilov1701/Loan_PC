<?php
require_once 'db_connect.php';
try {
    $stmt = $pdo->query("DESCRIBE dashboard");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
