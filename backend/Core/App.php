<?php
namespace Core;

class App 
{
    public function __construct()
    {
        
    }

    public function run()
    {
        $template = new Template('index', ['webSocketServerAddress' => 'ws://127.0.0.1:9501']);
        print $template->render();
    }
}