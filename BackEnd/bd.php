<?php
$host = 'localhost';
$port = '5433'; 
$dbname = 'drivego';
$user = 'admin';
$password = 'admin';

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

?>

