<?php
namespace Project\Controllers;
use Project\WebSocket\Server;
use OpenSwoole\WebSocket\Frame;

class Players
{
    private $webSocketServer;
    private $frame;
    private $playersRepository;

    public function __construct(Server $webSocketServer, Frame $frame, \Project\WebSocket\PlayersRepository $playersRepository)
    {
        $this->webSocketServer = $webSocketServer;
        $this->frame = $frame;
        $this->playersRepository = $playersRepository;
    }

    public function getPlayers()
    {
        $this->webSocketServer->sendMessage(
            [
                'controller' => 'Players',
                'action' => 'players',
                'args' => [
                    'playersData' => $this->playersRepository->players(),
                ]
            ],
            $this->frame->fd
        );
    }

    public function auth($name)
    {
        if ($this->playersRepository->isExists($name)) {
            //$this->playersOnline->set($this->frame->$fd,['player' => $name, 'connect'=> $this->frame->fd, 'status' => 'online']);
            $this->playersRepository->setOnline(
                $name,
                $this->frame->fd
            );

            $this->playersRepository->set(
                $name,
                [
                    'name' => (string) $name,
                    'connect' => (string) $this->frame->fd,
                    'status' => (string) 'Online'
               ]
            );
            $this->webSocketServer->sendMessage(
                ["controller" => "Players", "action" => "auth", "args" => ["ok" => true]],
                $this->frame->fd
            );
            foreach ($this->playersRepository->playersOnline() as  $key => $row)
            {
                $this->webSocketServer->sendMessage(
                    [
                        'controller' => 'Players',
                        'action' => 'players',
                        'args' => [
                            'playersData' => $this->playersRepository->players(),
                        ]
                    ],
                    (int)$key
                );
            }

        } else {
            $this->webSocketServer->sendMessage(
                ["controller" => "Players", "action" => "auth", "args" => ["ok" => false]],
                $this->frame
            );
        }
    }
}