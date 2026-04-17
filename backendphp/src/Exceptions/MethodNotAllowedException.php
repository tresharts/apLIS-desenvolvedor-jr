<?php

declare(strict_types=1);

namespace App\Exceptions;

final class MethodNotAllowedException extends HttpException
{
    public function __construct(string $message = 'Método não permitido')
    {
        parent::__construct($message, 405);
    }
}
