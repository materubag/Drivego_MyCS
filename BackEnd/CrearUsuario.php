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
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents(filename: 'php://input'), associative: true);

if (isset($input['nom_usu'])&&isset($input['ape_usu']) && isset($input['cor_usu']) && isset($input['con_usu'])&&isset($input['tipo_usu'])) {
    $nom = $input['nom_usu'];
    $ape=$input['ape_usu'];
    $corr = $input['cor_usu'];
    $con = $input['con_usu'];
    $cargo = $input['tipo_usu'];
    $codigo_verificacion = bin2hex(random_bytes(16));
   

    try {
        $query = "INSERT INTO USUARIOS(nom_usu,ape_usu,corr_usu,con_usu,cargo,codigo_verificacion) values (:nom,:ape,:corr,:con,:cargo,:codigo);";
        $stmt = $conn->prepare(query: $query);
    
    $stmt->execute(params:[
        ':nom'=>$nom,
        ':ape'=>$ape,
        ':corr'=>$corr,
        ':con'=>$con,
        ':cargo'=>$cargo,
        ':codigo'=>$codigo_verificacion
   ]);
   if($stmt->rowCount()>0){
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'proyectodrivego@gmail.com';
        $mail->Password = 'qheh vngb ohku zhic'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
   
        $mail->setFrom('proyectodrivego@gmail.com', 'DriveGo');
        $mail->addAddress($corr);
   
        $mail->isHTML(true);
        $mail->Subject = 'Verificación de cuenta';
        $mail->Body = "
                    <h1>Bienvenido a DriveGo</h1>
                    <p>Gracias por registrarte, $nom.</p>
                    <p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta:</p>
                    <a href='http://localhost:5173/verificar?correo=$corr&token=$codigo_verificacion'>
                        Verificar mi cuenta
                    </a>
                    
                ";
   
        $mail->send();
        $response=array(
           "status"=>true,
           "message"=>"Usuario registrado. Revisa tu correo para confirmar."
       );
    }catch(PDOException $e){
       $response=array(
           "status"=>false,
           "message"=>"No se pudo enviar el correo ". $e->getMessage()
       );

    $response=array(
        "status"=>true,
        "message"=>"Registro de usuario exitoso"
    );
    }
   }else{
    $response=array(
        "status"=>false,
        "message"=>"No se pudo registrar al usuario"
    );
   }
    } catch (PDOException $e) {
        $response=array(
            "status"=>false,
            "message"=>"Error al registrar al usuario: ". $e->getMessage()
        );
    }
}else{
    $response=array(
        "status"=>false,
        "message"=>"Datos incompletos"
    );
}

$conn=null;
header('Content-Type: application/json');
echo json_encode($response);

?>