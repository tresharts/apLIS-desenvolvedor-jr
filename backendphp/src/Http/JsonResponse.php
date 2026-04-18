<?php

declare(strict_types=1);

namespace App\Http;

use App\Config\AppConfig;

final class JsonResponse
{
    public static function prepareDefaultHeaders(AppConfig $appConfig, Request $request): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $allowedOrigin = $appConfig->resolveAllowedOrigin($request->getHeader('Origin'));

        if ($allowedOrigin !== null) {
            header('Access-Control-Allow-Origin: ' . $allowedOrigin);

            if ($allowedOrigin !== '*') {
                header('Vary: Origin');
                header('Access-Control-Allow-Credentials: true');
            }
        }

        header('Access-Control-Allow-Headers: Content-Type, Accept, Origin');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    }

    public static function send(array $payload, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    }

    public static function sendNoContent(): void
    {
        http_response_code(204);
    }
}
