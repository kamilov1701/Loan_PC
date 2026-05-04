<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT 
        SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as total,
        SUM(CASE WHEN status = 'Paid' THEN CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED) ELSE 0 END) as repaid
        FROM dashboard");
    $global_finance = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $g_total = (int)($global_finance['total'] ?? 0);
    $g_repaid = (int)($global_finance['repaid'] ?? 0);
    $pdo->prepare("UPDATE debts SET total_debt = ?, past_due_debt = ? WHERE id = 1")
        ->execute([$g_total, $g_repaid]);

    $period = $_GET['period'] ?? 'Monthly';
    $dateFilter = "";
    $logFilter = "";

    $targetDate = "DATE(created_at)";

    switch ($period) {
        case 'Daily':
            $dateFilter = " WHERE $targetDate = CURDATE()";
            $logFilter = " WHERE DATE(created_at) = CURDATE()";
            break;
        case 'Weekly':
            $dateFilter = " WHERE $targetDate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
            $logFilter = " WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
            break;
        case 'Monthly':
            $dateFilter = " WHERE $targetDate >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
            $logFilter = " WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)";
            break;
        case 'Yearly':
            $dateFilter = " WHERE $targetDate >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
            $logFilter = " WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
            break;
        case 'EveryYear':
        default:
            $dateFilter = "";
            $logFilter = "";
            break;
    }

    $stmt = $pdo->query("SELECT COUNT(DISTINCT casser_id) as active_cassers, COUNT(*) as loans_given 
                         FROM logs $logFilter " . ($logFilter ? " AND " : " WHERE ") . " action_type = 'added_loaner'");
    $today_stats = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $pdo->query("SELECT 
        SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) as total_loans,
        SUM(CASE WHEN status = 'Paid' THEN CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED) ELSE 0 END) as repaid_loans,
        COUNT(*) as total_count
        FROM dashboard $dateFilter");
    $finance = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $pdo->query("SELECT status, COUNT(*) as count FROM dashboard $dateFilter GROUP BY status");
    $status_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->query("SELECT l.*, c.name as casser_name 
                         FROM logs l 
                         LEFT JOIN cassers c ON l.casser_id = c.id 
                         $logFilter
                         ORDER BY l.created_at DESC LIMIT 10");
    $recent_logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total_loans = (int)($finance['total_loans'] ?? 0);
    $repaid = (int)($finance['repaid_loans'] ?? 0);
    $total_count = (int)($finance['total_count'] ?? 1);

    echo json_encode([
        "summary_text" => $period . " davomida " . ($today_stats['active_cassers'] ?? 0) . " ta kassir " . ($today_stats['loans_given'] ?? 0) . " ta qarz berdi!",
        "total_loans" => $total_loans,
        "repaid" => $repaid,
        "outstanding" => $total_loans - $repaid,
        "avg_loan" => $total_loans / ($total_count ?: 1),
        "status_data" => $status_data,
        "recent_logs" => $recent_logs
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

