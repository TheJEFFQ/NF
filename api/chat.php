<?php
session_start();
header('Content-Type: application/json');
require_once '../database/db_config.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'get_messages':
                $other_user_id = $_GET['user_id'];
                $current_user_id = $_SESSION['user_id'];
                
                $sql = "SELECT m.*, u.full_name as sender_name 
                        FROM messages m 
                        JOIN users u ON m.sender_id = u.id 
                        WHERE (sender_id = ? AND receiver_id = ?) 
                        OR (sender_id = ? AND receiver_id = ?) 
                        ORDER BY timestamp ASC";
                
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("iiii", $current_user_id, $other_user_id, $other_user_id, $current_user_id);
                $stmt->execute();
                $result = $stmt->get_result();
                
                $messages = [];
                while ($row = $result->fetch_assoc()) {
                    $messages[] = $row;
                }
                
                echo json_encode(['success' => true, 'messages' => $messages]);
                break;
                
            case 'get_contacts':
                $sql = "SELECT DISTINCT u.id, u.full_name 
                        FROM users u 
                        JOIN messages m ON u.id = m.sender_id OR u.id = m.receiver_id 
                        WHERE u.id != ?";
                
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("i", $_SESSION['user_id']);
                $stmt->execute();
                $result = $stmt->get_result();
                
                $contacts = [];
                while ($row = $result->fetch_assoc()) {
                    $contacts[] = $row;
                }
                
                echo json_encode(['success' => true, 'contacts' => $contacts]);
                break;
        }
    }
}
?>
