<?php
include 'config.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare(
            "SELECT r.ID_RES, r.CED_USU_RES, r.NOM_USU_RES, v.MAR_VEH, v.MOD_VEH
            FROM RESERVAS r
            LEFT JOIN VEHICULOS v ON r.MATRICULA_VEH = v.MAT_VEH 
            WHERE r.des_dev IS NULL OR r.des_dev = ''"
        );
        $stmt->execute();
        $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["success" => true, "data" => $reservas]);
        exit;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al obtener las reservas: " . $e->getMessage()]);
        exit;
    }
}
?>