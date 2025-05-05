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
if (isset($input['id_usu'])) {
    $id = $input["id_usu"];

    $query="DELETE FROM Usuarios ";
    $stmt=$conn->prepare($query);
    try{
        $stmt->execute(params:[
            ':id'=>$id
        ]);
        if($stmt->rowCount()>0){
            $response=array(
                "status"=>true,
                "message"=>"Eliminación de usuario exitoso"
            ); 
        }else{
            $response=array(
                "status"=>false,
                "message"=>">Error en eliminar los datos"
            ); 
        }

    }catch(PDOException $e){
        $response=array(
            "status"=>false,
            "message"=>"Error al eliminar los datos: ". $e->getMessage()
        );
    }
    $conn=null;
    header('Content-Type: application/json');
    echo json_encode($response);
    
}
?>