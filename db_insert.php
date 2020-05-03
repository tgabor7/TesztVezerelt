<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$indata = $_POST["name"];
$sql = "INSERT INTO tarkgabor.Players(UserName, Experience, Damage, State, X, Y, Class) VALUES ('$indata', 0, 10, 0, 1,1,'None')";

if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
?>