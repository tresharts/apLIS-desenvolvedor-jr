<?php

declare(strict_types=1);

namespace App\Http;

use App\Exceptions\ValidationException;

final class Request
{
    private ?array $decodedJsonBody = null;

    /**
     * @param array<string, string> $headers
     */
    private function __construct(
        private readonly string $method,
        private readonly string $path,
        private readonly array $headers,
        private readonly string $rawBody,
    ) {
    }

    public static function fromGlobals(): self
    {
        $rawBody = file_get_contents('php://input');

        return new self(
            strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET'),
            parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/',
            self::extractHeaders(),
            $rawBody === false ? '' : $rawBody,
        );
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getHeader(string $name): ?string
    {
        $normalizedName = strtolower($name);

        foreach ($this->headers as $headerName => $headerValue) {
            if (strtolower($headerName) === $normalizedName) {
                return $headerValue;
            }
        }

        return null;
    }

    public function getJsonBody(): array
    {
        if ($this->decodedJsonBody !== null) {
            return $this->decodedJsonBody;
        }

        if ($this->rawBody === '') {
            $this->decodedJsonBody = [];
            return $this->decodedJsonBody;
        }

        $decodedBody = json_decode($this->rawBody, true);

        if (!is_array($decodedBody)) {
            throw new ValidationException('JSON inválido', [
                'body' => 'O corpo da requisição deve ser um JSON válido',
            ]);
        }

        $this->decodedJsonBody = $decodedBody;
        return $this->decodedJsonBody;
    }

    /**
     * @return array<string, string>
     */
    private static function extractHeaders(): array
    {
        if (function_exists('getallheaders')) {
            $headers = getallheaders();

            if (is_array($headers)) {
                return $headers;
            }
        }

        $headers = [];

        foreach ($_SERVER as $key => $value) {
            if (!str_starts_with($key, 'HTTP_')) {
                continue;
            }

            $headerName = str_replace('_', '-', strtolower(substr($key, 5)));
            $headerName = ucwords($headerName, '-');

            $headers[$headerName] = (string) $value;
        }

        return $headers;
    }
}
