<?php
session_start();
header('Content-Type: application/json');
require_once '../database/db_config.php';

function response($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'login':
                $email = mysqli_real_escape_string($conn, $data['email']);
                $password = $data['password'];

                $sql = "SELECT id, full_name, email, password FROM users WHERE email = ?";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "s", $email);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($user = mysqli_fetch_assoc($result)) {
                    if (password_verify($password, $user['password'])) {
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['full_name'] = $user['full_name'];
                        response(true, "Login successful", ['full_name' => $user['full_name']]);
                    }
                }
                response(false, "Invalid email or password");
                break;

            case 'register':
                $fullName = mysqli_real_escape_string($conn, $data['fullName']);
                $email = mysqli_real_escape_string($conn, $data['email']);
                $password = password_hash($data['password'], PASSWORD_DEFAULT);

                $sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
                $stmt = mysqli_prepare($conn, $sql);
                mysqli_stmt_bind_param($stmt, "sss", $fullName, $email, $password);

                if (mysqli_stmt_execute($stmt)) {
                    response(true, "Registration successful");
                } else {
                    response(false, "Registration failed");
                }
                break;

            case 'logout':
                session_destroy();
                response(true, "Logout successful");
                break;

            case 'check_auth':
                if (isset($_SESSION['user_id'])) {
                    response(true, "User is logged in", [
                        'full_name' => $_SESSION['full_name']
                    ]);
                } else {
                    response(false, "User is not logged in");
                }
                break;
        }
    }
}
?>
