<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
include 'bd.php';
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['correo'], $input['token'])) {
    $correo = $input['correo'];
    $codigo = $input['token'];

    try {
        $query = "SELECT * FROM USUARIOS WHERE corr_usu = :correo AND codigo_verificacion = :codigo";
        $stmt = $conn->prepare($query);
        $stmt->execute([':correo' => $correo, ':codigo' => $codigo]);

        if ($stmt->rowCount() > 0) {
            $updateQuery = "UPDATE USUARIOS SET verificado = TRUE WHERE corr_usu = :correo";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->execute([':correo' => $correo]);

            $response = [
                "status" => true,
                "message" => "Correo verificado exitosamente."
            ];
        } else {
            $response = [
                "status" => false,
                "message" => "Código de verificación incorrecto."
            ];
        }
    } catch (PDOException $e) {
        $response = [
            "status" => false,
            "message" => "Error: " . $e->getMessage()
        ];
    }
} else {
    $response = [
        "status" => false,
        "message" => "Datos incompletos."
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>