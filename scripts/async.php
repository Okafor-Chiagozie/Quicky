<?php

require_once "config.php";
require_once "functions.php";


if($_REQUEST['action'] === 'todoAll'){

   echo json_encode(get_all_items());
}


if($_REQUEST['action'] === 'todoAdd'){

   echo addItem($_REQUEST["text"]);
}


if($_REQUEST['action'] === 'todoUpdate'){

   echo update_todo($_REQUEST["id"], $_REQUEST["text"]);
}


if($_REQUEST['action'] === 'todoDelete'){

   echo delete_todo($_REQUEST["id"]);
}