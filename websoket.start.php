<?php
require_once(__DIR__ . '/vendor/autoload.php');
require_once(__DIR__ . '/backend/bootstrap.php');

$playersDBMock = new Project\PlayersDBMock();
$playersRepository = new Project\WebSocket\PlayersRepository();

$db = new Project\WebSocket\PlayersDB();
$db->run();
$wss = new Project\WebSocket\Server($db);

$wss->start();