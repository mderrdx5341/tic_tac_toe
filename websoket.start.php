<?php
require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/backend/bootstrap.php');

$db = new Project\WebSocket\PlayersDBClient();
$db->connect();
$wss = new Project\WebSocket\Server($db);

$wss->start();