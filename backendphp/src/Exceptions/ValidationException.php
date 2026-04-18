<?php

declare(strict_types=1);

namespace App\Exceptions;

final class ValidationException extends HttpException
{
    public function __construct(string $message, array $errors = [])
    {
        parent::__construct($message, 400, $errors);
    }
}
