<?php
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $login = $data['login'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($login) || empty($password)) {
        echo json_encode(["success" => false, "error" => "Login va parolni kiriting"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM cassers WHERE login = ? AND status = 'Active'");
        $stmt->execute([$login]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['password'] === $password) {
            echo json_encode([
                "success" => true,
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "login" => $user['login'],
                    "role" => $user['role'],
                    "image" => $user['image'],
                    "local_image" => $user['local_image']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Login yoki parol noto'g'ri yoki hisob faol emas"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
