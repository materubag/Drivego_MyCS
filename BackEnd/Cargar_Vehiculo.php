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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $uploadDir = './IMAGEN';
  $uploadedFile = null;

  if (!empty($_FILES['img_veh']['name'])) {
    $fileName = time() . '_' . basename($_FILES['img_veh']['name']);
    $uploadFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['img_veh']['tmp_name'], $uploadFilePath)) {
      $uploadedFile = $uploadFilePath;
    } else {
      $response = array(
        "status" => false,
        "message" => "Error al subir la imagen "
      );
      exit;
    }
  } else {
    $uploadedFile = 'default.png';
  }

  $marca = $_POST['mar_veh'];
  $modelo = $_POST['mod_veh'];
  $tipo = $_POST['tip_veh'];
  $anio = $_POST['anio_veh'];
  $matricula = $_POST['mat_veh'];
  $estado = $_POST['est_veh'];
  $transmision = $_POST['tip_trans_veh'];
  $kilometros = $_POST['kil_veh'];
  $ocupantes = $_POST['num_ocu_veh'];
  $puertas = $_POST['num_pue_veh'];
  $chasis = $_POST['chasis'];
  $combustible=$_POST['comb_veh'];

  $query = '
        INSERT INTO VEHICULOS(
            MAT_VEH, MAR_VEH, MOD_VEH, TIP_VEH, ANIO_VEH,
            EST_VEH, TIP_TRANS_VEH, KIL_VEH, NUM_OCU_VEH, NUM_PUE_VEH, IMG_VEH,CHASIS,COMBUSTIBLE
        )
        VALUES (
            :matricula, :marca, :modelo, :tipo, :anio,
            :estado, :transmision, :kilometros, :ocupantes, :puertas, :img,:chasis,:combustible
        )
    ';

  $stmt = $conn->prepare($query);

  try {
    $stmt->execute([
      ':matricula' => $matricula,
      ':marca' => $marca,
      ':modelo' => $modelo,
      ':tipo' => $tipo,
      ':anio' => $anio,
      ':estado' => $estado,
      ':transmision' => $transmision,
      ':kilometros' => $kilometros,
      ':ocupantes' => $ocupantes,
      ':puertas' => $puertas,
      ':img' => $uploadedFile,
      'chasis'=>$chasis,
      'combustible'=>$combustible
    ]);

    if ($stmt->rowCount() > 0) {
      $response = array(
        "status" => true,
        "message" => "Registro de vehículo exitoso"
      );
    } else {
      $response = array(
        "status" => false,
        "message" => "No se pudo registrar el vehículo"
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "status" => false,
      "message" => "Error al registrar el vehículo: " . $e->getMessage()
    );
  }
} else {
  $response = array(
    "status" => false,
    "message" => "DATOS INCOMPLETOS"
  );
}

$conn = null;
header('Content-Type: application/json');
echo json_encode($response);
?>