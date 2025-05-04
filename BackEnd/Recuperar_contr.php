<?php
include 'config.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'bd.php'; 

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['cont']) && isset($input['cont_temp'])) {
    $cont = $input['cont'];
    $cont_temp = $input['cont_temp'];
    $est_cont_temp = null; 
    $cfm = 'no';

    try {
        
        $query = "SELECT id_usu FROM usuarios WHERE CONT_TEMP = :cont_temp;";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ':cont_temp' => $cont_temp
        ]);

        if ($stmt->rowCount() > 0) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

           
                $id_usu = $usuario['id_usu'];

             
                $query2 = "UPDATE usuarios 
                           SET CON_USU = :cont_nue, CONT_TEMP = :cod, TMP_CONT = :cfm 
                           WHERE Id_usu = :id;";
                $stmt2 = $conn->prepare($query2);
                $stmt2->execute([
                    ':cont_nue' => $cont,
                    ':cod' => $est_cont_temp,
                    ':cfm' => $cfm,
                    ':id' => $id_usu
                ]);

                $response = [
                    "status" => true,
                    "message" => "Contraseña cambiada exitosamente"
                ];
            
        } else {
            $response = [
                "status" => false,
                "message" => "Contraseña temporal incorrecta"
            ];
        }
    } catch (PDOException $e) {
        $response = [
            "status" => false,
            "message" => "Error en el servidor: " . $e->getMessage()
        ];
    }
} else {
    $response = [
        "status" => false,
        "message" => "Datos incompletos"
    ];
}


$conn = null;


echo json_encode($response);
?>