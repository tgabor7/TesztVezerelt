<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$name = $_POST["name"];
$experience = $_POST["exp"];
$damage = $_POST["dmg"];
$x = $_POST["x"];
$y = $_POST["y"];
$state = $_POST["state"];
$class = $_POST["class"];

$sql = "UPDATE tarkgabor.Players SET Experience = " . $experience . ", X = " . $x . ", Y = " . $y . ", State = ". $state .", Class = '" . $class . "' WHERE UserName='$name'";
$result = $conn->query($sql);
echo $sql;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        
        echo 'ok';
    }
} else {
    echo $conn->error;
}
$conn->close();
?>