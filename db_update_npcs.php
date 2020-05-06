<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$indata = $_POST["name"];
$x = $_POST["x"];
$y = $_POST["y"];
$user = $_POST["user"];

$sql = "DELETE FROM tarkgabor.Npcs where UserName='$user' AND name='$indata' AND X=$x AND Y=$y";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
?>