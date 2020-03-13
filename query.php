<?php	
	require_once('dbconn.php');

	class queries extends dbcon{

		public function controlData($status, $firstname, $lastname, $contact, $id){
			$conn = $this->dbconnect();
				if($status == 'add'){
					$stmt = $conn->prepare("INSERT INTO records (firstname, lastname, contact_number) VALUES (?, ?, ?)");
					$stmt->bind_param("ssi", $firstname, $lastname, $contact);
					$stmt->execute();
				} else if ($status == 'edit') {
					$stmt = $conn->prepare("UPDATE records SET firstname=?, lastname=?, contact_number=? WHERE id=?");
					$stmt->bind_param("ssii", $firstname, $lastname, $contact, $id);
					$stmt->execute();
					
				} else {
					$stmt = $conn->prepare("DELETE FROM records WHERE id=?");
					$stmt->bind_param("i", $id);
					$stmt->execute();
				}
			$stmt->close();
			$conn->close();
		}

		public function showRecords(){
			$conn = $this->dbconnect();
			$stmt = $conn->prepare("SELECT id, firstname, lastname, contact_number FROM records"); 
			$stmt->execute();
			$result = $stmt->get_result(); // get the mysqli result
			$jsonResult = array();

				while($row = $result->fetch_assoc()){
					$jsonResult[] = $row;
				}
				
			$stmt->close();
			$conn->close();
			echo json_encode($jsonResult);
		}
		
	}//class
?>