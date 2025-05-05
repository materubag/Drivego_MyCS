<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'bd.php'; 

$input = json_decode(file_get_contents(filename: 'php://input'), associative: true);
if(isset($input['id_usu'])){
    $id=$input["id_usu"];
    $nom=$input["nom_usu"];
    $ape=$input["ape_usu"];
    $corr=$input["corr_usu"];
    $cargo=$input["cargo"];

    $query = "UPDATE USUARIOS SET nom_usu = :nom, ape_usu = :ape, corr_usu = :corr, cargo = :cargo WHERE id_usu = :id";
    
    $stmt=$conn->prepare($query);
    try{
    $stmt->execute(params:[
        ':id'=>$id,
        ':nom'=>$nom,
        'ape'=>$ape,
        ':corr'=>$corr,
        ':cargo'=>$cargo
    ]);
    if($stmt->rowCount()>0){
        $response=array(
            "status"=>true,
            "message"=>"Actualización de datos exitoso"
        ); 
    }else{
        $response=array(
            "status"=>false,
            "message"=>">Error en actualizar los datos"
        ); 
    }
    }catch(PDOException $e){
        $response=array(
            "status"=>false,
            "message"=>"Error al actualizar los datos: ". $e->getMessage()
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