<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$indata = $_POST["name"];
$x = $_POST["x"];
$y = $_POST["y"];
$user = $_POST["user"];
$stage = $_POST["stage"];

$sql = "INSERT INTO tarkgabor.Npcs (name, X, Y, UserName, Stage) VALUES('$indata', $x, $y, '$user', $stage) ON DUPLICATE KEY UPDATE name='$indata', X=$x, Y=$y, UserName='$user', Stage=$stage";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
?>