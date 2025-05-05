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
global $pdo;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET['cedula'])) {
            $cedula = $_GET['cedula'];
            $stmt = $conn->prepare(
                "SELECT 
                    r.id_res,
                    r.ced_usu_res,
                    r.nom_usu_res,
                    r.matricula_veh,
                    r.fec_res,
                    r.fec_dev,
                    r.est_veh_dev,
                    r.tar_adi,
                    r.des_dev,
                    r.des_extendida, 
                    r.met_pag,       
                    v.mod_veh,
                    v.mar_veh,
                    v.tip_veh,
                    v.img_veh
                FROM reservas r
                LEFT JOIN vehiculos v ON r.matricula_veh = v.mat_veh
                WHERE r.ced_usu_res = ? AND r.met_pag IS NOT NULL"
            );
            $stmt->execute([$cedula]);
            $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["success" => true, "data" => $reservas]);
            exit;
        } else {
            echo json_encode(["error" => "Error al obtener las reservas, faltan parámetros"]);
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al obtener las reservas: " . $e->getMessage()]);
        exit;
    }
}
?>