<?php
$servername = "localhost";
$username = "username";
$password = "2000!Millenium";
$dbname = "testing";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "USE testing";
  
  $sql = "CREATE TABLE soundCheck (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  mic VARCHAR(30) NOT NULL,
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )";
  
  $conn->exec($sql);
  
  echo "Ready on Stage 1 for Sound Check!";

} catch(PDOException $e) {

  echo $sql . "<br>" . $e->getMessage();

}

$conn = null;
?>

