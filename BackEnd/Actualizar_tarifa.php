<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


include 'bd.php';

$input = json_decode(file_get_contents('php://input'), true); 
if (isset($input['mat_veh']) && isset($input['precio_veh'])) {
    $idVehiculo = $input['mat_veh'];
    $nuevaTarifa = $input['precio_veh'];

    $query = "UPDATE vehiculos SET precio_veh = :tarifa_veh WHERE mat_veh = :id_veh";

    $stmt = $conn->prepare($query);

    try {
        $stmt->execute([
            ':id_veh' => $idVehiculo,
            ':tarifa_veh' => $nuevaTarifa
        ]);

        if ($stmt->rowCount() > 0) {
            $response = array(
                "status" => true,
                "message" => "Tarifa actualizada con éxito"
            );
        } else {
            $response = array(
                "status" => false,
                "message" => "No se encontró el vehículo o no hubo cambios"
            );
        }
    } catch (PDOException $e) {
        $response = array(
            "status" => false,
            "message" => "Error al actualizar la tarifa: " . $e->getMessage()
        );
    }
} else {
    $response = array(
        "status" => false,
        "message" => "Datos incompletos"
    );
}

$conn = null; 
header('Content-Type: application/json');
echo json_encode($response);
?>