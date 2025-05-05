<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'bd.php';
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($data['id_res'])) {
        echo json_encode(["error" => "ID de reserva no proporcionado."]);
        exit;
    }

    $idReserva = $data['id_res'];

    try {
        $stmt = $conn->prepare("DELETE FROM reservas WHERE id_res = ?");
        $stmt->execute([$idReserva]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => "Reserva eliminada correctamente."]);
        } else {
            echo json_encode(["error" => "No se encontró una reserva con ese ID."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al eliminar la reserva: " . $e->getMessage()]);
    }
}
?>
