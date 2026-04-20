<?php

declare(strict_types=1);

namespace App\Config;

final class AppConfig
{
    /**
     * @param list<string> $corsAllowedOrigins
     */
    private function __construct(
        private readonly string $appEnv,
        private readonly bool $appDebug,
        private readonly string $dbHost,
        private readonly string $dbPort,
        private readonly string $dbDatabase,
        private readonly string $dbUsername,
        private readonly string $dbPassword,
        private readonly array $corsAllowedOrigins,
    ) {
    }

    public static function fromEnvironment(): self
    {
        $corsOrigins = getenv('CORS_ALLOWED_ORIGINS') ?: getenv('CORS_ORIGIN') ?: 'http://localhost:5173';
        $corsAllowedOrigins = array_values(array_filter(array_map('trim', explode(',', $corsOrigins))));

        if ($corsAllowedOrigins === []) {
            $corsAllowedOrigins = ['http://localhost:5173'];
        }

        $localhostPatterns = ['http://localhost:*', 'http://127.0.0.1:*'];

        return new self(
            getenv('APP_ENV') ?: 'local',
            filter_var(getenv('APP_DEBUG') ?: 'false', FILTER_VALIDATE_BOOL),
            getenv('DB_HOST') ?: '127.0.0.1',
            getenv('DB_PORT') ?: '3306',
            getenv('DB_DATABASE') ?: '',
            getenv('DB_USERNAME') ?: 'root',
            getenv('DB_PASSWORD') ?: (getenv('MYSQL_PASSWORD') ?: ''),
            array_values(array_unique(array_merge($corsAllowedOrigins, $localhostPatterns))),
        );
    }

    public function isDebug(): bool
    {
        return $this->appDebug;
    }

    public function getDbHost(): string
    {
        return $this->dbHost;
    }

    public function getDbPort(): string
    {
        return $this->dbPort;
    }

    public function getDbDatabase(): string
    {
        return $this->dbDatabase;
    }

    public function getDbUsername(): string
    {
        return $this->dbUsername;
    }

    public function getDbPassword(): string
    {
        return $this->dbPassword;
    }

    public function resolveAllowedOrigin(?string $origin): ?string
    {
        if ($origin === null || $origin === '') {
            return '*';
        }

        foreach ($this->corsAllowedOrigins as $pattern) {
            if ($pattern === '*') {
                return '*';
            }

            if ($pattern === $origin || fnmatch($pattern, $origin)) {
                return $origin;
            }
        }

        return null;
    }
}
