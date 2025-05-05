<?php
include '../config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__ . '/../vendor/autoload.php';
require_once '../fpdf/fpdf.php';
require_once '../bd.php';

$data = json_decode(file_get_contents('php://input'), true);



function limpiarTexto($texto) {
    $buscar = array('Ñ', 'ñ', '°', 'N°', '°', 'ª', 'º');
    $reemplazar = array('N', 'n', '', '', '', '', '');
    return str_ireplace($buscar, $reemplazar, $texto);
}



$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, iconv('UTF-8', 'ISO-8859-1', 'CONTRATO DE COMPRAVENTA DE VEHICULO'), 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Conste por el presente documento el contrato de compraventa de vehiculo, celebrado entre _______________, identificado con numero de cedula _____________, a quien en lo sucesivo se denominara EL COMPRADOR; y de otra parte la empresa DRIVE GO con sede en la Universidad Tecnica de Ambato, a quien en lo sucesivo se denominara EL VENDEDOR, bajo las siguientes clausulas:");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'PRIMERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL VENDEDOR declara ser legitimo propietario del vehiculo usado, marca _____________, modelo _____________, anio de fabricacion _____________, con tipo de transmision _____________, No. de chasis _____________ y con placa No. _____________.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEGUNDO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL VENDEDOR declara que el vehiculo se encuentra en buen estado de funcionamiento mecanico y conservacion general, sin perjuicio del uso normal y desgaste propio del tiempo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'TERCERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Por el presente contrato, EL VENDEDOR transfiere a titulo de compraventa el vehiculo descrito a EL COMPRADOR, quien acepta adquirirlo en las condiciones mencionadas.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'CUARTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "El precio de la compraventa asciende a la suma de PRECIO_FINAL dolares, que EL COMPRADOR se obliga a pagar a EL VENDEDOR en dinero en efectivo o mediante los medios acordados entre ambas partes.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'QUINTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "La entrega del vehiculo, junto con sus documentos (tarjeta de propiedad, matricula y llaves), se realizara en la fecha de suscripcion del presente contrato.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEXTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Con la entrega del vehiculo, EL VENDEDOR se desliga de toda responsabilidad civil, administrativa o penal derivada del uso posterior del bien por parte de EL COMPRADOR.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEPTIMO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL COMPRADOR manifiesta haber revisado el vehiculo y aceptarlo en las condiciones en que se encuentra, renunciando a futuros reclamos por vicios o defectos ocultos.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'OCTAVO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Ambas partes declaran estar de acuerdo con lo estipulado y firman el presente documento en senal de aceptacion.");
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 10, '___________________________                    ___________________________', 0, 1, 'C');
$pdf->Cell(0, 10, 'EL VENDEDOR                                                EL COMPRADOR', 0, 1, 'C');

$pdf->Output();
?>
