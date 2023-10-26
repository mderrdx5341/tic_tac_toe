<?php
require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/backend/bootstrap.php');

$dbClient = new Project\WebSocket\PlayersDBClient();
$dbClient->connect();
$wss = new Project\WebSocket\Server($dbClient);

$wss->start();