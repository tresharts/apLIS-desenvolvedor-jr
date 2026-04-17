<?php

declare(strict_types=1);

namespace App\Exceptions;

final class NotFoundException extends HttpException
{
    public function __construct(string $message = 'Rota não encontrada')
    {
        parent::__construct($message, 404);
    }
}
