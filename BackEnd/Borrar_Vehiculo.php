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
$input = json_decode(file_get_contents(filename: 'php://input'), associative: true);
if (isset($input['mat_veh'])) {
    $mat = $input["mat_veh"];

    $query = "DELETE FROM VEHICULOS WHERE MAT_VEH=:mat;";
    $stmt = $conn->prepare($query);
    try {
        $stmt->execute(params: [
            ':mat' => $mat
        ]);
        if ($stmt->rowCount() > 0) {
            $response = array(
                "status" => true,
                "message" => "Eliminación de vehiculo exitoso"
            );
        } else {
            $response = array(
                "status" => false,
                "message" => ">Error en eliminar el vehiculo"
            );
        }

    } catch (PDOException $e) {
        $response = array(
            "status" => false,
            "message" => "Error al eliminar los datos: " . $e->getMessage()
        );
    }
    $conn = null;
    header('Content-Type: application/json');
    echo json_encode($response);

}

?>