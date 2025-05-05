<?php
include '../config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


require __DIR__ . '/../vendor/autoload.php';
require_once '../fpdf/fpdf.php';
require_once '../bd.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['fecha_inicio']) || !isset($data['fecha_fin'])) {
    echo json_encode(["error" => "Faltan los parámetros 'fecha_inicio' o 'fecha_fin'."]);
    exit;
}

$fecha_inicio = $data['fecha_inicio'];
$fecha_fin = $data['fecha_fin'];

if (!DateTime::createFromFormat('Y-m-d', $fecha_inicio) || !DateTime::createFromFormat('Y-m-d', $fecha_fin)) {
    echo json_encode(["error" => "Las fechas deben estar en formato 'YYYY-MM-DD'."]);
    exit;
}

$sql_count = "SELECT COUNT(*) AS total_reportes
              FROM reservas r
              WHERE r.fec_res BETWEEN :fecha_inicio AND :fecha_fin";
$stmt_count = $conn->prepare($sql_count);
$stmt_count->bindParam(':fecha_inicio', $fecha_inicio);
$stmt_count->bindParam(':fecha_fin', $fecha_fin);
$stmt_count->execute();
$result_count = $stmt_count->fetch(PDO::FETCH_ASSOC);
$total_reportes = $result_count['total_reportes'];

$sql = "SELECT r.id_res, r.nom_usu_res, r.matricula_veh, v.mar_veh, v.mod_veh, v.precio_veh, r.fec_res, r.fec_dev, r.tar_adi
        FROM reservas r
        INNER JOIN vehiculos v ON r.matricula_veh = v.mat_veh
        WHERE r.fec_res BETWEEN :fecha_inicio AND :fecha_fin";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':fecha_inicio', $fecha_inicio);
$stmt->bindParam(':fecha_fin', $fecha_fin);
$stmt->execute();
$reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

class PDF extends FPDF {
    function Header() {
        $this->SetFillColor(0, 102, 204);
        $this->Rect(0, 0, 210, 30, 'F');
        $this->Image('../../FrontEnd/public/Logo-sin_fodo.png', 150, 0, 40);
        $this->SetFont('Arial', 'B', 20);
        $this->SetTextColor(255, 255, 255);
        $this->Cell(170, 15, 'Reporte por Rango de Fechas', 0, 1, 'L', false);
        $this->Ln(10);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->SetTextColor(128, 128, 128);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 12);

if (!$reservas) {
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, iconv("UTF-8", "ISO-8859-1", "No se encontraron registros en el rango especificado."), 0, 1, 'C');
} else {
    $pdf->Cell(0, 10, "Reporte desde $fecha_inicio hasta $fecha_fin", 0, 1, 'L');
    $pdf->Cell(0, 10, iconv("UTF-8","ISO-8859-1","Número de Reportes: $total_reportes"), 0, 1, 'L');
    $pdf->Ln(5);
    
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->SetFillColor(0, 102, 204);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(30, 10, 'Usuario', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Matricula', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Marca', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Modelo', 1, 0, 'C', true);
    $pdf->Cell(15, 10, 'Dias', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Valor Base', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Valor Adic.', 1, 0, 'C', true);
    $pdf->Cell(25, 10, 'Total', 1, 1, 'C', true);
    
    $pdf->SetFont('Arial', '', 9);
    $pdf->SetTextColor(0, 0, 0);
    
    $total_general = 0;
    
    foreach ($reservas as $reserva) {
        $fecha_reserva = new DateTime($reserva['fec_res']);
        $fecha_devolucion = new DateTime($reserva['fec_dev']);
        $dias = $fecha_reserva->diff($fecha_devolucion)->days;
    
        $valor_base = $reserva['precio_veh'] * $dias;
        $valor_adicional = $reserva['tar_adi'];
        $total = $valor_base + $valor_adicional;
    
        $total_general += $total;
    
        $pdf->Cell(30, 10, $reserva['nom_usu_res'], 1, 0, 'C');
        $pdf->Cell(25, 10, $reserva['matricula_veh'], 1, 0, 'C');
        $pdf->Cell(25, 10, $reserva['mar_veh'], 1, 0, 'C');
        $pdf->Cell(25, 10, $reserva['mod_veh'], 1, 0, 'C');
        $pdf->Cell(15, 10, $dias, 1, 0, 'C');
        $pdf->Cell(25, 10, number_format($valor_base, 2), 1, 0, 'C');
        $pdf->Cell(25, 10, number_format($valor_adicional, 2), 1, 0, 'C');
        $pdf->Cell(25, 10, number_format($total, 2), 1, 1, 'C');
    }
    
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(170, 10, 'TOTAL GENERAL', 1, 0, 'R');
    $pdf->Cell(25, 10, number_format($total_general, 2), 1, 1, 'C');
}

$pdf->Output('D', "reporte_rango_{$fecha_inicio}_{$fecha_fin}.pdf");
?>