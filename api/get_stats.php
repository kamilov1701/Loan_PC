<?php
require_once 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT loan_amount, status FROM dashboard");
    $dashboard_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total_loans = 0;
    $active_loaners = 0;
    $paid_total = 0;
    $paid_count = 0;

    foreach ($dashboard_data as $row) {
        $amount = (int) preg_replace('/[^0-9]/', '', $row['loan_amount']);
        $total_loans += $amount;
        
        if (in_array($row['status'], ['Active', 'Due Soon', 'Overdue'])) {
            $active_loaners++;
        }
        
        if ($row['status'] === 'Paid') {
            $paid_total += $amount;
            $paid_count++;
        }
    }

    echo json_encode([
        "total_loans" => $total_loans,
        "active_loaners" => $active_loaners,
        "paid_total" => $paid_total,
        "paid_count" => $paid_count,
        "growth" => 12
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
