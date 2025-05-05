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
    if (!isset($data['cedulaUsuario'], $data['nombreUsuario'], $data['matriculaVehiculo'], $data['fechaReserva'])) {
        echo json_encode(["error" => "Datos incompletos."]);
        exit;
    }

    $cedulaUsuario = $data['cedulaUsuario'];
    $nombreUsuario = $data['nombreUsuario'];
    $matriculaVehiculo = $data['matriculaVehiculo'];
    $fechaReserva = $data['fechaReserva'];  

    try {
        $stmt = $conn->prepare("SELECT est_veh FROM VEHICULOS WHERE mat_veh = ?");
        $stmt->execute([$matriculaVehiculo]);
        $vehiculo = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$vehiculo) {
            echo json_encode(["error" => "El vehículo no existe."]);
            exit;
        }

        if ($vehiculo['est_veh'] !== 'Disponible') {
            echo json_encode(["error" => "El vehículo no está disponible."]);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM RESERVAS WHERE MATRICULA_VEH = ? AND FEC_RES = ?");
        $stmt->execute([$matriculaVehiculo, $fechaReserva]);
        $reservaExistente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($reservaExistente) {
            echo json_encode(["error" => "Ya existe una reserva con esa fecha de inicio para este vehículo."]);
            exit;
        }

        $stmt = $conn->prepare(
            "INSERT INTO RESERVAS (CED_USU_RES, NOM_USU_RES, MATRICULA_VEH, FEC_RES) 
            VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([$cedulaUsuario, $nombreUsuario, $matriculaVehiculo, $fechaReserva]);

        echo json_encode(["success" => "Reserva creada exitosamente. Vehículo marcado como Alquilado."]);
        exit;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al crear la reserva: " . $e->getMessage()]);
        exit;
    }
}
?>