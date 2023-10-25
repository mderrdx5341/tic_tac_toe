<?php
namespace Project\WebSocket;

use Swoole\Table;

class PlayersRepository
{
    private $playersDB;
    private $table;
    private $tableOnline;

    public function __construct()
    {
        $this->table = new Table(1024);
        $this->table->column('name', Table::TYPE_STRING, 100);
        $this->table->column('connect', Table::TYPE_STRING, 100);
        $this->table->column('status', Table::TYPE_STRING, 100);
        $this->table->column('wins', Table::TYPE_STRING, 100);
        $this->table->create();
        //
        $this->tableOnline = new Table(1024);
        $this->tableOnline->column('name', Table::TYPE_STRING, 100);
        $this->tableOnline->create();
    }

    public function set($name, $data)
    {
        $this->table->set($name, $data);
    }

    public function setOnline($name, $fd) 
    {
        $this->table->set(
            $name,
            [
                'name' => (string) $name,
                'connect' => (string) $fd,
                'status' => (string) 'Online'
           ]
        );
        $this->tableOnline->set(
            $fd,
            [
                'name' => $name
            ]
            );
    }

    public function setOffline($fd)
    {
        $playerData = $this->tableOnline->get($fd);
        var_dump($playerData);
        $this->table->set(
            $playerData['name'],
            [
                'name' => (string) $playerData['name'],
                'connect' => (string) '',
                'status' => (string) 'Offline'
           ]
        );

        $this->tableOnline->del($fd);
    }

    public function printAll()
    {
        
        foreach ($this->table as  $key => $row)
        {
            var_dump($key);
            var_dump($row);
        }
    }

    public function isExists($name)
    {
        return $this->table->exists($name);
    }

    public function players() {
        $players = [];
        foreach ($this->table as  $key => $row)
        {
            $players[$row['name']] = $row;
        }
        return $players;
    }

    public function playersOnline()
    {
        return $this->tableOnline;
    }

    public function get($id)
    {
        return $this->table->get($id);
    }

    /*
    private $players = [];

    public function __construct()
    {

    }

    public function addPlayer(String $name, $fd)
    {
        $this->players[$name] = [
            'fd' => $fd
        ];
    }

    public function delPlayer(String $name)
    {
        unset($this->players[$name]);
    }

    public function getPlayer(String $name)
    {
        if(array_key_exists($name, $this->players)) {
            return $this->players[$name];
        }
    }
    */
}