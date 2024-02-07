<?php

function addItem($input){
   global $connection;

   $query = "INSERT INTO `todo`(`body`) VALUES( '$input')";
   $result = $connection->query($query);

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

   $query = "UPDATE `todo` set `body` = '$text' WHERE `id` = '$id'";
   $result = $connection->query($query);

   return $result;
}


function delete_todo($id){
   global $connection;

   $query = "DELETE FROM todo WHERE id = '$id'";
   $result = $connection->query($query);

   return $result;
}