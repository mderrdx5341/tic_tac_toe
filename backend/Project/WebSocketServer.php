<?php
namespace Project;

use Swoole\WebSocket\Server;
use Swoole\Http\Request;
use Swoole\WebSocket\Frame;


class WebSocketServer
{
    private $server;

    public function __construct()
    {    
        $this->server = new Server("0.0.0.0", 9501);
        $this->server->set([
            'worker_num' => 50,
            'heartbeat_idle_time' => 600,
            'heartbeat_check_interval' => 60,        
            //'task_worker_num' => 50,
            //'websocket_compression' => true,
        ]);

        $this->server->on("Start", function(Server $server)
        {
            echo "Swoole WebSocket Server is started at http://127.0.0.1:9501\n";
        });

        $this->server->on('Open', function(Server $server, \Swoole\Http\Request $request)
        {
            echo "connection open: {$request->fd}\n";
        });

        $this->server->on('Message', function(Server $server, Frame $frame)
        {
            $this->message($server, $frame);
        });

        $this->server->on('Close', function(Server $server, int $fd)
        {
            echo "connection close: {$fd}\n";
        });

        $this->server->on('Disconnect', function(Server $server, int $fd)
        {
            echo "disconnect: {$fd}\n";
        });
    }

    private function message(Server $server, $frame) {
        var_dump($frame->data);
        $this->server->push($frame->fd, json_encode(["hello", time()]));
    }

    public function start()
    {
        $this->server->start();
    }
}