<?php
require_once 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as total FROM dashboard");
    $total_loans = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    $stmt = $pdo->query("SELECT COUNT(*) as active_count FROM dashboard WHERE status IN ('Active', 'Due Soon', 'Overdue')");
    $active_loaners = $stmt->fetch(PDO::FETCH_ASSOC)['active_count'] ?? 0;

    $stmt = $pdo->query("SELECT SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as paid_total FROM dashboard WHERE status = 'Paid'");
    $paid_total = $stmt->fetch(PDO::FETCH_ASSOC)['paid_total'] ?? 0;

    $stmt = $pdo->query("SELECT COUNT(*) as paid_count FROM dashboard WHERE status = 'Paid'");
    $paid_count = $stmt->fetch(PDO::FETCH_ASSOC)['paid_count'] ?? 0;

    echo json_encode([
        "total_loans" => (int)$total_loans,
        "active_loaners" => (int)$active_loaners,
        "paid_total" => (int)$paid_total,
        "paid_count" => (int)$paid_count,
        "growth" => 12
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
