<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

if (
    !empty($input['nombre']) &&
    !empty($input['correo']) &&
    !empty($input['tema']) &&
    !empty($input['mensaje']) &&
    !empty($input['tipo'])
) {
    $nombre = $input['nombre'];
    $correo = $input['correo'];
    $tema = $input['tema'];
    $mensaje = $input['mensaje'];
    $tipo = $input['tipo'];

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'proyectodrivego@gmail.com';
        $mail->Password = 'pvzv calt sawy eotu'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('proyectodrivego@gmail.com', 'Formulario de Contacto');
        $mail->addAddress('proyectodrivego@gmail.com'); 
        $mail->addReplyTo($correo, $nombre); 

        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de contacto: $tema";

        $mail->Body = "
            <h3>Nuevo mensaje desde el formulario de contacto</h3>
            <p><strong>Nombre:</strong> $nombre</p>
            <p><strong>Email:</strong> $correo</p>
            <p><strong>Tipo de mensaje:</strong> $tipo</p>
            <p><strong>Mensaje:</strong><br>$mensaje</p>
        ";

        $mail->send();
        echo json_encode(["status" => true, "message" => "Mensaje enviado correctamente."]);
    } catch (Exception $e) {
        echo json_encode(["status" => false, "message" => "Error al enviar el mensaje: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => false, "message" => "Todos los campos son obligatorios."]);
}
