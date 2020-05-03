<?php
$conn = new mysqli('mysql.caesar.elte.hu','tarkgabor','tLJxKijVUeK4QsAB');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$indata = $_POST["name"];
$sql = "SELECT Experience, Damage, State, X, Y, Class FROM tarkgabor.Players WHERE UserName='$indata'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "".$row["Experience"]." ".$row["Damage"]." ".$row["State"]." ".$row["X"]." ".$row["Y"]." ".$row["Class"];
    }
} else {
    echo "0 results";
}
$conn->close();
?>