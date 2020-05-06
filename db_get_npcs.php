<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$user = $_POST["user"];
$stage = $_POST["stage"];

$sql = "SELECT * FROM tarkgabor.Npcs WHERE UserName='$user' AND Stage=$stage";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "".$row["name"]." ".$row["X"]." ".$row["Y"] . " ";
    }
} else {
    echo "0 results";
}
$conn->close();
?>