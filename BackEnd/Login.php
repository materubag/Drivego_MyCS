<?php
include_once 'config.php'; 
include_once 'bd.php';
header("Access-Control-Allow-Origin: ".FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true); 

if(isset($input['correo_usuario'])&& isset($input['contrasena'])){
   $correo_usuario=$input['correo_usuario'];
   $contrasena = $input['contrasena'];

   try {
      
       $query = "SELECT * FROM usuarios WHERE corr_usu = :correo_usuario";
       $stmt = $conn->prepare($query);
       $stmt->execute([':correo_usuario' => $correo_usuario]);

       if ($stmt->rowCount() > 0) {
           $user = $stmt->fetch(PDO::FETCH_ASSOC);
           
           if ($user['tmp_cont'] == 'si') {
          
               if ($contrasena === $user['cont_temp']) {
                   $response = [
                       "status" => true,
                       "message" => "Contraseña temporal válida",
                       "redirect" => $user['tmp_cont']
                       
                   ];
               } else {
                   $response = [
                       "status" => false,
                       "message" => "Contraseña temporal incorrecta"
                   ];
               }
           } else {
               
               if ($contrasena === $user['con_usu']) {
                   $response = [
                       "status" => true,
                       "message" => "Inicio de sesión exitoso",
                       "nombre" => $user['nom_usu'],
                       "rol" => $user['cargo']
                   ];
               } else {
                   $response = [
                       "status" => false,
                       "message" => "Usuario o contraseña incorrectos"
                   ];
               }
           }
       } else {
           $response = ["status" => false, "message" => "Usuario no encontrado"];
       }
   } catch (PDOException $e) {
       $response = ["status" => false, "message" => "Error en el servidor: " . $e->getMessage()];
   }
} else {
   $response = ["status" => false, "message" => "Datos incompletos"];
}

$conn = null;

header('Content-Type: application/json');
echo json_encode($response);



?>