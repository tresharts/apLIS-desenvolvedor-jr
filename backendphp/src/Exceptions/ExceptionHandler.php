<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Config\AppConfig;
use App\Http\JsonResponse;
use App\Http\Request;
use Throwable;

final class ExceptionHandler
{
    public function __construct(private readonly AppConfig $appConfig)
    {
    }

    public function handle(Throwable $throwable, Request $request): void
    {
        if ($throwable instanceof HttpException) {
            $payload = ['message' => $throwable->getMessage()];

            if ($throwable->getErrors() !== []) {
                $payload['errors'] = $throwable->getErrors();
            }

            JsonResponse::send($payload, $throwable->getStatusCode());
            return;
        }

        error_log(sprintf(
            '[backendphp][%s] %s %s - %s',
            date('c'),
            $request->getMethod(),
            $request->getPath(),
            $throwable->getMessage()
        ));

        $payload = ['message' => 'Erro interno do servidor'];

        if ($this->appConfig->isDebug()) {
            $payload['debug'] = [
                'exception' => $throwable::class,
                'message' => $throwable->getMessage(),
            ];
        }

        JsonResponse::send($payload, 500);
    }
}
