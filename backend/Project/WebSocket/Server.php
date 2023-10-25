<?php
namespace Project\WebSocket;

use Swoole\WebSocket\Server as SwooleWebSocket;
use Swoole\Http\Request;
use Swoole\WebSocket\Frame;


class Server
{
    private $server;
    private $playersRepository;
    private $playersOnline;

    public function __construct($playersDB)
    {
        $this->playersDB = $playersDB;
        $this->playersRepository = new PlayersRepository();
        $this->server = new SwooleWebSocket("0.0.0.0", 9501);
        $this->server->set([
            'worker_num' => 50,
            'heartbeat_idle_time' => 600,
            'heartbeat_check_interval' => 60,        
            //'task_worker_num' => 50,
            //'websocket_compression' => true,
        ]);

        $this->init();

        $this->server->on("Start", function(SwooleWebSocket $server)
        {
            echo "Swoole WebSocket Server is started at http://127.0.0.1:9501\n";
        });

        $this->server->on('Open', function(SwooleWebSocket $server, \Swoole\Http\Request $request)
        {
            echo "connection open: {$request->fd}\n";
        });

        $this->server->on('Message', function(SwooleWebSocket $server, Frame $frame)
        {
            $this->message($server, $frame);
        });

        $this->server->on('Close', function(SwooleWebSocket $server, int $fd)
        {
            echo "connection close: {$fd}\n";
            $this->close($fd);
        });

        $this->server->on('Disconnect', function(SwooleWebSocket $server, int $fd)
        {
            echo "disconnect: {$fd}\n";            
        });
    }

    private function init()
    {
        print("init\n");
        $playersResponseDB = $this->playersDB->playerResponseDB();
        while($player = $playersResponseDB->fetch()) {
            var_dump($player);
            $this->playersRepository->set(
                (string) $player['name'],
                [
                    'name' => (string) $player['name'],
                    'connect' => (string) '',
                    'wins' => (string) $player['wins'],
                    'status' => (string) 'Offline'
               ]
            );
        }
    }

    private function message(SwooleWebSocket $server, Frame $frame): void {
        var_dump($frame->data);

        $request = json_decode($frame->data);

        if (is_null($request)) {
            //$this->server->push($frame->fd, json_encode("hello " . time()));
            return;
        }

        if (property_exists($request, 'action')) {
            echo "received message:\n";
            var_dump($request);
            var_dump($request->controller, $request->action);
            $controller = $this->buildActionClassName($request->controller);
            $c = new $controller($this, $frame, $this->playersRepository);
            $c->{$request->action}($request->data);
            //var_dump($this->playersRepository);
            return;
        }
    }

    public function start()
    {
        $this->server->start();
    }

    public function sendMessage(Array $message, int $fd): void
    {
        $this->server->push($fd, json_encode($message));
    }

    public function close($fd)
    {
        $this->playersRepository->setOffline($fd);
    }

    private function buildActionClassName(string $name): string
    {
        $className = ucwords(str_replace('_', ' ', $name));
        return '\\Project\\Controllers\\'. str_replace(' ', '', $className); //TODO
    }
}