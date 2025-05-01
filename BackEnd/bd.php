<?php
$host = 'localhost';
$dbname = 'DB_Driver';
$user = 'postgres';
$password = 'DriverG@';
try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos PostgreSQL.";
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>