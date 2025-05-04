<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require('../fpdf/fpdf.php'); 

require_once '../bd.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['cedula_usu'])) {
    echo json_encode(["error" => "Falta el ID de la reserva."]);
    exit;
}

$cedula_usu = $data['cedula_usu'];

$stmt = $conn->prepare("SELECT r.ced_usu_res, r.nom_usu_res, r.matricula_veh, r.fec_res, r.fec_dev, v.mar_veh, v.mod_veh, v.anio_veh, v.tip_trans_veh, v.chasis, v.mat_veh
                        FROM reservas r
                        JOIN vehiculos v ON r.matricula_veh = v.mat_veh
                        WHERE r.ced_usu_res = ?");
$stmt->execute([$cedula_usu]);
$reserva = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$reserva) {
    echo json_encode(["error" => "No se encontró la reserva."]);
    exit;
}

function limpiarTexto($texto) {
    $buscar = array('Ñ', 'ñ', '°', 'N°', '°', 'ª', 'º');
    $reemplazar = array('N', 'n', '', '', '', '', '');
    return str_ireplace($buscar, $reemplazar, $texto);
}

$cedulaUsuario = limpiarTexto($reserva['ced_usu_res']);
$nombreUsuario = limpiarTexto($reserva['nom_usu_res']);
$matriculaVehiculo = limpiarTexto($reserva['matricula_veh']);
$fechaReserva = limpiarTexto($reserva['fec_res']);
$fechaDevolucion = limpiarTexto($reserva['fec_dev']);
$marcaVehiculo = limpiarTexto($reserva['mar_veh']);
$modeloVehiculo = limpiarTexto($reserva['mod_veh']);
$anioVehiculo = limpiarTexto($reserva['anio_veh']);
$transmisionVehiculo = limpiarTexto($reserva['tip_trans_veh']);
$chasisVehiculo = limpiarTexto($reserva['chasis']);

$pdf = new FPDF();
$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, iconv('UTF-8', 'ISO-8859-1', 'CONTRATO DE COMPRAVENTA DE VEHÍCULO'),0,1,'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Conste por el presente documento el contrato de compraventa de vehículo, celebrado entre $nombreUsuario, identificado con número de cédula $cedulaUsuario, a quien en lo sucesivo se denominará EL COMPRADOR; y de otra parte la empresa DRIVE GO con sede en la Universidad Técnica de Ambato, a quien en lo sucesivo se denominará EL VENDEDOR, bajo las siguientes cláusulas:");
$pdf->Ln(10);

// CLAUSULAS
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'PRIMERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL VENDEDOR declara ser legítimo propietario del vehículo usado, marca $marcaVehiculo, modelo $modeloVehiculo, año de fabricación $anioVehiculo, con tipo de transmisión $transmisionVehiculo, No. de chasis $chasisVehiculo y con placa No. $matriculaVehiculo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEGUNDO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL VENDEDOR declara que el vehículo se encuentra en buen estado de funcionamiento mecánico y conservación general, sin perjuicio del uso normal y desgaste propio del tiempo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'TERCERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Por el presente contrato, EL VENDEDOR transfiere a título de compraventa el vehículo descrito a EL COMPRADOR, quien acepta adquirirlo en las condiciones mencionadas.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'CUARTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "El precio de la compraventa asciende a la suma de PRECIO_FINAL dólares, que EL COMPRADOR se obliga a pagar a EL VENDEDOR en dinero en efectivo o mediante los medios acordados entre ambas partes.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'QUINTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "La entrega del vehículo, junto con sus documentos (tarjeta de propiedad, matrícula y llaves), se realizará en la fecha de suscripción del presente contrato.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEXTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Con la entrega del vehículo, EL VENDEDOR se desliga de toda responsabilidad civil, administrativa o penal derivada del uso posterior del bien por parte de EL COMPRADOR.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SÉPTIMO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL COMPRADOR manifiesta haber revisado el vehículo y aceptarlo en las condiciones en que se encuentra, renunciando a futuros reclamos por vicios o defectos ocultos.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'OCTAVO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Ambas partes declaran estar de acuerdo con lo estipulado y firman el presente documento en señal de aceptación.");
$pdf->Ln(10);

// Firma
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 10, '___________________________                    ___________________________', 0, 1, 'C');
$pdf->Cell(0, 10, 'EL VENDEDOR                                                EL COMPRADOR', 0, 1, 'C');

// Mostrar o guardar PDF
$pdf->Output();
?>
