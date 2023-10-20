<?php
require_once(__DIR__ . '/backend/bootstrap.php');

$wss = new Project\WebSocketServer();
$wss->start();