<?php

require_once __DIR__ . "/vendor/autoload.php";

class Server {
    function route () {
        $klein = new \Klein\Klein();
        $klein->respond('GET', '/', function () {
            return file_get_contents(__DIR__ . "/../web/index.html");
        });
        
        $klein->dispatch();
    }
}