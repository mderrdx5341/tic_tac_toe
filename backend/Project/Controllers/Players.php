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
            $this->playersRepository->players(),
            $this->frame
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
                ["ok" => true],
                $this->frame
            );
        } else {
            $this->webSocketServer->sendMessage(
                ["ok" => false],
                $this->frame
            );
        }
    }
}