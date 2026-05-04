<?php
require_once 'db_connect.php';

try {
    $today = date('Y-m-d');
    
    $stmt = $pdo->prepare("SELECT * FROM dashboard WHERE deadline < ? AND status != 'Paid' ORDER BY deadline ASC");
    $stmt->execute([$today]);
    $overdue = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $next_week = date('Y-m-d', strtotime('+7 days'));
    $stmt = $pdo->prepare("SELECT * FROM dashboard WHERE deadline >= ? AND deadline <= ? AND status != 'Paid' ORDER BY deadline ASC");
    $stmt->execute([$today, $next_week]);
    $upcoming = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "overdue" => $overdue,
        "upcoming" => $upcoming
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
