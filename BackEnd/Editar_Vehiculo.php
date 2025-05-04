<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
                "message" => "Error al subir la imagen"
            );
            header('Content-Type: application/json');
            echo json_encode($response);
            exit();
        }
    }

    
    $input = $_POST; 

    if (
        isset($input['mat_veh'], $input['mar_veh'], $input['mod_veh'], $input['tip_veh'], $input['anio_veh'],
              $input['est_veh'], $input['tip_trans_veh'], $input['kil_veh'], $input['num_ocu_veh'], 
              $input['num_pue_veh'], $input['chasis'], $input['combustible'])
    ) {
        $matricula = $input['mat_veh'];
        $marca = $input['mar_veh'];
        $modelo = $input['mod_veh'];
        $tipo = $input['tip_veh'];
        $anio = $input['anio_veh'];
        $estado = $input['est_veh'];
        $transmision = $input['tip_trans_veh'];
        $kilometros = $input['kil_veh'];
        $ocupantes = $input['num_ocu_veh'];
        $puertas = $input['num_pue_veh'];
        $chasis = $input['chasis'];
        $combustible = $input['combustible'];

        $query = "
            UPDATE vehiculos
            SET 
                mar_veh = :marca,
                mod_veh = :modelo,
                tip_veh = :tipo,
                anio_veh = :anio,
                est_veh = :estado,
                tip_trans_veh = :transmision,
                kil_veh = :kilometros,
                num_ocu_veh = :ocupantes,
                num_pue_veh = :puertas,
                chasis = :chasis,
                combustible = :combus";

  
        if ($uploadedFile !== null) {
            $query .= ", img_veh = :img";
        }

        $query .= " WHERE mat_veh = :matricula";

        $stmt = $conn->prepare($query);

        $params = [
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
            ':chasis' => $chasis,
            ':combus' => $combustible
        ];

        if ($uploadedFile !== null) {
            $params[':img'] = $uploadedFile;
        }

        try {
            $stmt->execute($params);

            $response = array(
                "status" => $stmt->rowCount() > 0,
                "message" => $stmt->rowCount() > 0 
                            ? "Vehículo actualizado exitosamente"
                            : "No se encontró el vehículo o no hubo cambios"
            );
        } catch (PDOException $e) {
            error_log("Error en la consulta SQL: " . $e->getMessage());
            $response = array(
                "status" => false,
                "message" => "Error al actualizar el vehículo"
            );
        }
    } else {
        $response = array(
            "status" => false,
            "message" => "Datos incompletos"
        );
    }
}

$conn = null;
header('Content-Type: application/json');
echo json_encode($response);
?>
