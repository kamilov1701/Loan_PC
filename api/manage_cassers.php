<?php
require_once 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $today = date('Y-m-d');
        $stmt = $pdo->query("SELECT c.*, 
            (SELECT COUNT(*) FROM logs WHERE casser_id = c.id AND DATE(created_at) = '$today' AND action_type = 'added_loaner') as today_count,
            (SELECT SUM(CAST(REPLACE(REPLACE(REPLACE(loan_amount, ' ', ''), 'UZS', ''), ',', '') AS UNSIGNED)) FROM dashboard WHERE casser_id = c.id AND DATE(created_at) = '$today') as today_lent_total,
            (SELECT name FROM dashboard WHERE casser_id = c.id AND DATE(created_at) = '$today' ORDER BY created_at DESC LIMIT 1) as last_loan_client,
            (SELECT loan_amount FROM dashboard WHERE casser_id = c.id AND DATE(created_at) = '$today' ORDER BY created_at DESC LIMIT 1) as last_loan_amount
            FROM cassers c");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($method === 'POST') {
        $id = $_POST['id'] ?? null;
        $name = $_POST['name'] ?? null;
        $login = $_POST['login'] ?? null;
        $password = $_POST['password'] ?? null;
        $status = $_POST['status'] ?? 'Active';
        $role = $_POST['role'] ?? 'Admin';
        $image_url = null;
        $local_path = null;

        if (empty($name) || (!$id && (empty($login) || empty($password)))) {
            echo json_encode(["success" => false, "message" => "Barcha majburiy maydonlarni to'ldiring"]);
            exit;
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

        if ($id) {
            $sql = "UPDATE cassers SET name = ?, status = ?, role = ?";
            $params = [$name, $status, $role];
            if ($local_path) {
                $sql .= ", image = ?, local_image = ?";
                $params[] = $image_url;
                $params[] = $local_path;
            }
            $sql .= " WHERE id = ?";
            $params[] = $id;
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            echo json_encode(["success" => true, "message" => "Updated"]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO cassers (name, login, password, status, role, image, local_image) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $login, $password, $status, $role, $image_url, $local_path]);
            echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        }
    } elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;
        $name = $data['name'] ?? null;
        $role = $data['role'] ?? null;
        $status = $data['status'] ?? null;

        if (!$id) {
            echo json_encode(["success" => false, "message" => "ID topilmadi"]);
            exit;
        }

        $fields = [];
        $params = [];
        if ($name) { $fields[] = "name = ?"; $params[] = $name; }
        if ($role) { $fields[] = "role = ?"; $params[] = $role; }
        if ($status) { $fields[] = "status = ?"; $params[] = $status; }

        if (empty($fields)) {
            echo json_encode(["success" => true, "message" => "O'zgarish yo'q"]);
            exit;
        }

        $params[] = $id;
        $sql = "UPDATE cassers SET " . implode(", ", $fields) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode(["success" => true]);
    } elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM cassers WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true]);
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
