<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'bd.php';

try {
    $stmt = $conn->prepare("
        SELECT *
        FROM reservas
        WHERE met_pag IS NULL
    ");
    $stmt->execute();
    $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => true, "data" => $reservas]);
} catch (PDOException $e) {
    echo json_encode(["status" => false, "error" => "Error al obtener las reservas: " . $e->getMessage()]);
}
?>
