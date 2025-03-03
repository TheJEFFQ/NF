<?php
require_once '../vendor/autoload.php';
require_once '../database/db_config.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class ChatServer implements MessageComponentInterface {
    protected $clients;
    protected $users = [];

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg);
        $numRecv = count($this->clients) - 1;
        
        foreach ($this->clients as $client) {
            if ($client !== $from && $client->resourceId == $data->receiver_id) {
                $client->send(json_encode([
                    'sender_id' => $data->sender_id,
                    'message' => $data->message,
                    'timestamp' => date('Y-m-d H:i:s')
                ]));
            }
        }

        // Store message in database
        global $conn;
        $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $data->sender_id, $data->receiver_id, $data->message);
        $stmt->execute();
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    8080
);

$server->run();
