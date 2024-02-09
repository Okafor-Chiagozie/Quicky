<?php

function addItem($text){
   global $connection;

   $query = "INSERT INTO `todo` (`body`) VALUES (?)";
   $stmt = $connection->prepare($query);
   $stmt->bind_param("s", $text);
   $result = $stmt->execute();
   $stmt->close();

   return $result;
}


function get_all_items(){
   global $connection;

   $query = "SELECT * FROM `todo`";
   $result = $connection->query($query);

   return $result->fetch_all(MYSQLI_ASSOC);
}


function update_todo($id, $text){
   global $connection;

   $query = "UPDATE `todo` set `body` = ? WHERE `id` = ?";
   $stmt = $connection->prepare($query);
   $stmt->bind_param("si", $text, $id);
   $result = $stmt->execute();
   $stmt->close();

   return $result;
}


function delete_todo($id){
   global $connection;

   $query = "DELETE FROM todo WHERE id = '$id'";
   $result = $connection->query($query);

   $query = "DELETE FROM `todo` WHERE `id` = ?";
   $stmt = $connection->prepare($query);
   $stmt->bind_param("i", $id);
   $result = $stmt->execute();
   $stmt->close();

   return $result;
}