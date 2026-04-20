<?php

declare(strict_types=1);

namespace App\Config;

use PDO;

final class Database
{
    public function __construct(private readonly AppConfig $appConfig)
    {
    }

    private ?PDO $connection = null;

    public function getConnection(): PDO
    {
        if ($this->connection instanceof PDO) {
            return $this->connection;
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            $this->appConfig->getDbHost(),
            $this->appConfig->getDbPort(),
            $this->appConfig->getDbDatabase()
        );

        $this->connection = new PDO($dsn, $this->appConfig->getDbUsername(), $this->appConfig->getDbPassword(), [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        return $this->connection;
    }
}
