<?php
require_once 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

try {
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? null;
    $password = $_POST['password'] ?? null;
    $image_url = null;
    $local_path = null;

    if (!$id) {
        throw new Exception("ID topilmadi");
    }

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = bin2hex(random_bytes(16)) . '.' . $ext;
        
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        $local_target = $upload_dir . $filename;
        if (move_uploaded_file($file['tmp_name'], $local_target)) {
            $local_path = 'api/' . $local_target;
        }

        $ch = curl_init('https://catbox.moe/user/api.php');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'reqtype' => 'fileupload',
            'fileToUpload' => new CURLFile(realpath($local_target))
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $catbox_res = curl_exec($ch);
        curl_close($ch);

        if ($catbox_res && strpos($catbox_res, 'http') === 0) {
            $image_url = trim($catbox_res);
        }
    }

    $fields = [];
    $params = [];

    if ($name) {
        $fields[] = "name = ?";
        $params[] = $name;
    }
    if ($password) {
        $fields[] = "password = ?";
        $params[] = $password;
    }
    if ($image_url) {
        $fields[] = "image = ?";
        $params[] = $image_url;
    }
    if ($local_path) {
        $fields[] = "local_image = ?";
        $params[] = $local_path;
    }

    if (empty($fields)) {
        echo json_encode(["success" => true, "message" => "O'zgarish yo'q"]);
        exit;
    }

    $params[] = $id;
    $sql = "UPDATE cassers SET " . implode(", ", $fields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        "success" => true, 
        "image" => $image_url, 
        "local_image" => $local_path,
        "name" => $name
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
