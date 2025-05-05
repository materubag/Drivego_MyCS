<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(response_code: 200);
    exit();
}
include 'bd.php';

$query = "SELECT *FROM VEHICULOS;";
$stmt = $conn->prepare($query);

try {
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $veh = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            "status" => true,
            "message" => "Datos extraidos con exito",
            "veh" => $veh
        );
    } else {
        $response = array(
            "status" => false,
            "message" => "No existen datos " . $e->getMessage()
        );
    }

} catch (PDOException $e) {
    $response = array(
        "status" => false,
        "message" => "Error al traer los datos " . $e->getMessage()
    );
}
$conn = null;
header('Content-Type: application/json');
echo json_encode($response);
?>