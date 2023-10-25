<?php
namespace Project\WebSocket;

use OpenSwoole\Core\Coroutine\Client\PDOConfig;
use OpenSwoole\Core\Coroutine\Client\PDOClient;

// mysql -usite -psite -h192.168.234.95
class PlayersDB
{
    private $config;
    private $client;

    public function run(): void
    {
        $config = (new PDOConfig())
            ->withHost('192.168.224.1')
            // ->withUnixSocket('/tmp/mysql.sock')
            ->withDbName('tic_tac_toe')
            ->withCharset('utf8mb4')
            ->withUsername('site')
            ->withPassword('site');

        $this->client = new PDOClient($config);
    }

    public function playerResponseDB()
    {
        return $this->client->query('SELECT * from players');
    }

    public function players()
    {
        $playersResponse = $this->client->query('SELECT * from players');
        $players = [];
        while($player = $players->fetch()) {
            $players[] = $player;
        }
        return $players;
    }
}