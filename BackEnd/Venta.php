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
    if (!isset($data['id_res'], $data['metodo_pago'])) {
        echo json_encode(["error" => "Datos incompletos."]);
        exit;
    }

    $idReserva = $data['id_res'];
    $metodoPago = $data['metodo_pago'];

    try {
        $stmt = $conn->prepare("UPDATE reservas SET met_pag = ? WHERE id_res = ?");
        $stmt->execute([$metodoPago, $idReserva]);

        echo json_encode(["success" => "Método de pago actualizado exitosamente."]);
        exit;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al actualizar el método de pago: " . $e->getMessage()]);
        exit;
    }
}
?>