<?php
require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/backend/bootstrap.php');

$db = new Project\WebSocket\PlayersDB();
$db->run();
$wss = new Project\WebSocket\Server($db);

$wss->start();