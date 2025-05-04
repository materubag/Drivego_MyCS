<?php
include '../config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require __DIR__ . '/../vendor/autoload.php';
require_once '../bd.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['id_reserva'])) {
    echo json_encode(["error" => "Falta el ID de la venta."]);
    exit;
}

$id_reserva = $data['id_reserva'];
$stmt = $conn->prepare("SELECT r.ced_usu_res, r.nom_usu_res, r.matricula_veh, r.fec_res, r.fec_dev, r.tar_adi, r.des_dev, v.precio_veh, v.mar_veh, v.mod_veh
                        FROM reservas r
                        JOIN vehiculos v ON r.matricula_veh = v.mat_veh
                        WHERE r.id_res = ?");
$stmt->execute([$id_reserva]);
$reserva = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$reserva) {
    echo json_encode(["error" => "No se encontró la venta."]);
    exit;
}

$cedulaUsuario = $reserva['ced_usu_res'];
$nombreUsuario = $reserva['nom_usu_res'];
$matriculaVehiculo = $reserva['matricula_veh'];
$fechaReserva = $reserva['fec_res'];
$fechaDevolucion = $reserva['fec_dev'];
$tarifaAdicional = $reserva['tar_adi'];
$descripcionDanios = $reserva['des_dev'] ?: 'N/A';
$precioVehiculo = $reserva['precio_veh'];
$marcaVehiculo = $reserva['mar_veh'];
$modeloVehiculo = $reserva['mod_veh'];

$fecha1 = new DateTime($fechaReserva);
$fecha2 = new DateTime($fechaDevolucion);
$interval = $fecha1->diff($fecha2);
$diasAlquiler = $interval->days;
$costoAlquiler = $precioVehiculo * $diasAlquiler;
$costoTotal = $costoAlquiler + $tarifaAdicional;
$iva = $costoTotal * 0.15;
$totalConIva = $costoTotal + $iva;

$codigoBarras = "FACT" . str_pad($id_reserva, 6, '0', STR_PAD_LEFT) . date("Ymd");

$pdf = new PDF_Code128('P', 'mm', 'Letter');
$pdf->SetMargins(17, 17, 17);
$pdf->AddPage();
$pdf->SetDrawColor(0, 0, 0);
$pdf->Image('../../FrontEnd/public/Logo-sin_fodo.png', 160, 12, 50, 40, 'PNG');

$pdf->SetFont('Arial', 'B', 16);
$pdf->SetTextColor(32, 100, 210);
$pdf->Cell(150, 10, iconv("UTF-8", "ISO-8859-1", strtoupper("DRIVE GO")), 0, 0, 'L');
$pdf->Ln(9);

$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(150, 9, iconv("UTF-8", "ISO-8859-1", "RUC: 0000000000"), 0, 0, 'L');
$pdf->Ln(5);
$pdf->Cell(150, 9, iconv("UTF-8", "ISO-8859-1", "Dirección Av. Av. Los Chasquis y Río Payamino"), 0, 0, 'L');
$pdf->Ln(5);
$pdf->Cell(150, 9, iconv("UTF-8", "ISO-8859-1", "Teléfono: 0939830949"), 0, 0, 'L');
$pdf->Ln(5);
$pdf->Cell(150, 9, iconv("UTF-8", "ISO-8859-1", "Email: anabelJaque@gmail.com"), 0, 0, 'L');
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "Fecha de emisión:"), 0, 0);
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(116, 7, iconv("UTF-8", "ISO-8859-1", date("d/m/Y")), 0, 0, 'L');
$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(35, 7, iconv("UTF-8", "ISO-8859-1", strtoupper("Factura Nro.")), 0, 0, 'C');
$pdf->Ln(7);

$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(14, 7, iconv("UTF-8", "ISO-8859-1", "Cliente: "), 0, 0, 'L');
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(40, 7, iconv("UTF-8", "ISO-8859-1", $nombreUsuario), 0, 0, 'L');
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(8, 7, iconv("UTF-8", "ISO-8859-1", "Doc: "), 0, 0, 'L');
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(10, 7, iconv("UTF-8", "ISO-8859-1", "CED:"), 0, 0, 'L');
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(40, 7, iconv("UTF-8", "ISO-8859-1", $cedulaUsuario), 0, 0, 'L');
$pdf->Cell(7, 7, iconv("UTF-8", "ISO-8859-1", "Tel:"), 0, 0, 'L');
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(35, 7, iconv("UTF-8", "ISO-8859-1", "00000000"), 0, 0);
$pdf->SetTextColor(39, 39, 51);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(35, 7, iconv("UTF-8", "ISO-8859-1", $id_reserva), 0, 0, 'C');
$pdf->Ln(7);

$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(17, 7, iconv("UTF-8", "ISO-8859-1", "Vehículo: "), 0, 0);
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(60, 7, iconv("UTF-8", "ISO-8859-1", "$marcaVehiculo $modeloVehiculo"), 0, 0, 'L');
$pdf->Ln(7);

$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(55, 7, iconv("UTF-8", "ISO-8859-1", "Descripción de Tarifa Adicional: "), 0, 0);
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(60, 7, iconv("UTF-8", "ISO-8859-1", "$descripcionDanios"), 0, 0, 'L');
$pdf->Ln(7);

$pdf->SetFont('Arial', 'B', 10);
$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(7, 7, iconv("UTF-8", "ISO-8859-1", "Dir: "), 0, 0);
$pdf->SetFont('Arial', '', 10);
$pdf->SetTextColor(97, 97, 97);
$pdf->Cell(109, 7, iconv("UTF-8", "ISO-8859-1", "Ambato"), 0, 0);
$pdf->Ln(9);

$pdf->SetFont('Arial', '', 8);
$pdf->SetFillColor(23, 83, 201);
$pdf->SetDrawColor(23, 83, 201);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(90, 8, iconv("UTF-8", "ISO-8859-1", "Descripción"), 1, 0, 'C', true);
$pdf->Cell(32, 8, iconv("UTF-8", "ISO-8859-1", "Cantidad"), 1, 0, 'C', true);
$pdf->Cell(32, 8, iconv("UTF-8", "ISO-8859-1", "Precio"), 1, 0, 'C', true);
$pdf->Cell(32, 8, iconv("UTF-8", "ISO-8859-1", "Total"), 1, 0, 'C', true);
$pdf->Ln(8);

$pdf->SetTextColor(39, 39, 51);
$pdf->Cell(90, 7, iconv("UTF-8", "ISO-8859-1", "Venta de vehículo"), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "$diasAlquiler días"), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "$" . number_format($precioVehiculo, 2)), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "$" . number_format($costoAlquiler, 2)), 'LR', 0, 'C');
$pdf->Ln(7);

$pdf->Cell(90, 7, iconv("UTF-8", "ISO-8859-1", "Tarifa adicional"), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "N/A"), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "$" . number_format($tarifaAdicional, 2)), 'L', 0, 'C');
$pdf->Cell(32, 7, iconv("UTF-8", "ISO-8859-1", "$" . number_format($tarifaAdicional, 2)), 'LR', 0, 'C');
$pdf->Ln(7);

$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(90, 7, '', 'T', 0, 'C');
$pdf->Cell(32, 7, '', 'T', 0, 'C');
$pdf->Cell(32, 7, 'Subtotal', 'T', 0, 'C');
$pdf->Cell(32, 7, "$" . number_format($costoTotal, 2), 'T', 0, 'C');
$pdf->Ln(7);
$pdf->Cell(90, 7, '', '', 0, 'C');
$pdf->Cell(32, 7, '', '', 0, 'C');
$pdf->Cell(32, 7, 'IVA (15%)', '', 0, 'C');
$pdf->Cell(32, 7, "$" . number_format($iva, 2), '', 0, 'C');
$pdf->Ln(7);
$pdf->Cell(90, 7, '', 'T', 0, 'C');
$pdf->Cell(32, 7, '', 'T', 0, 'C');
$pdf->Cell(32, 7, 'Total a Pagar', 'T', 0, 'C');
$pdf->Cell(32, 7, "$" . number_format($totalConIva, 2), 'T', 0, 'C');
$pdf->Ln(12);

$pdf->SetFont('Arial', '', 9);

$pdf->SetTextColor(39, 39, 51);
$pdf->MultiCell(0, 9, iconv("UTF-8", "ISO-8859-1", "*** Precios de los vehiculos no incluyen impuestos. Para poder realizar un reclamo debe de presentar esta factura ***"), 0, 'C', false);

$pdf->Ln(9);

$pdf->SetFillColor(39, 39, 51);
$pdf->SetDrawColor(23, 83, 201);
$pdf->Code128(72, $pdf->GetY(), $codigoBarras, 70, 20);
$pdf->SetXY(12, $pdf->GetY() + 21);
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 5, iconv("UTF-8", "ISO-8859-1", $codigoBarras), 0, 'C', false);

$pdf->Output("I", "Factura_Nro_$id_reserva.pdf", true);
?>