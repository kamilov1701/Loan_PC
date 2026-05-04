<?php
require_once 'db_connect.php';

try {
    $pdo->exec("ALTER TABLE cassers ADD COLUMN IF NOT EXISTS role ENUM('Programmer', 'Owner', 'Admin') DEFAULT 'Admin'");
    $pdo->exec("ALTER TABLE dashboard ADD COLUMN IF NOT EXISTS casser_id INT DEFAULT NULL");
    
    $stmt = $pdo->query("SELECT COUNT(*) FROM cassers");
    if ($stmt->fetchColumn() == 0) {
        $pdo->prepare("INSERT INTO cassers (name, login, password, role, status) VALUES (?, ?, ?, ?, ?)")
            ->execute(['Super Admin', 'admin', 'admin123', 'Programmer', 'Active']);
    }

    echo json_encode(["success" => true, "message" => "Database updated successfully with role column"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
