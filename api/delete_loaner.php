<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if ($id) {
        try {
            $stmt = $pdo->prepare("UPDATE dashboard SET delete_status = 'True' WHERE id = ?");
            if ($stmt->execute([$id])) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => "Failed to delete"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "ID not provided"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
