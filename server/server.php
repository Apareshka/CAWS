<?php

require_once __DIR__ . "/vendor/autoload.php";

ini_set("extension", "pdo.so");
ini_set("extension", "php_pdo.dll");
ini_set("extension", "php_sqlite3.dll");
ini_set("extension", "php_pdo_sqlite.dll");

class Server {
    function route () {
        $klein = new \Klein\Klein();
        $klein->respond('GET', '/', function () {
            return file_get_contents(__DIR__ . "/../web/index.html");
        });

        $klein->respond('GET', '/service', function () {
            return file_get_contents(__DIR__ . "/../web/service.html");
        });

        $klein->respond('GET', '/risk', function () {
            if (!isset($_GET["country"]) or !isset($_GET["sex"]) or !isset($_GET["age"])) {
                return 1;
            }

            $country = $_GET["country"];
            $sex = $_GET["sex"];
            $age = $_GET["age"];

            return shell_exec("python ".__DIR__."/../analyzer/mortality.py $age $sex $country");
        });

        $klein->respond('GET', '/risks', function () {
            try {
                $risksConn = new PDO("sqlite:".__DIR__."/../databases/risks.sqlite");
                $countriesConn = new PDO("sqlite:".__DIR__."/../databases/countries.sqlite");

                $risks = $risksConn->query("SELECT * FROM countries_risks");
                
                if (!$risks) {
                    throw new Exception();
                }

                $arr = [];

                while ($risk = $risks->fetch() and list($id, $v) = $risk) {
                    $country = NULL;

                    try {
                        $country = $countriesConn->query("SELECT `name` FROM countries WHERE id = '$id'")->fetch()["name"];
                    } catch (PDOException $e) {
                        throw new Exception();
                    }
                    
                    $arr[] = [
                        "id" => $id,
                        "country" => $country,
                        "risk" => $v
                    ];
                }

                return json_encode($arr);
            } catch (Exception $e) {
                return 1;
            }
        });
        
        $klein->dispatch();
    }
}