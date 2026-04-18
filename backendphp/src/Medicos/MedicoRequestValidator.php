<?php

declare(strict_types=1);

namespace App\Medicos;

use App\Exceptions\ValidationException;

final class MedicoRequestValidator
{
    public function validate(MedicoRequest $medicoRequest): void
    {
        $errors = [];

        if ($medicoRequest->getNome() === '') {
            $errors['nome'] = 'Nome é obrigatório';
        } elseif (mb_strlen($medicoRequest->getNome()) > 255) {
            $errors['nome'] = 'Nome deve ter no máximo 255 caracteres';
        }

        if ($medicoRequest->getCrm() === '') {
            $errors['CRM'] = 'CRM é obrigatório';
        } elseif (mb_strlen($medicoRequest->getCrm()) > 20) {
            $errors['CRM'] = 'CRM deve ter no máximo 20 caracteres';
        }

        if ($medicoRequest->getUfcrm() === '') {
            $errors['UFCRM'] = 'UFCRM é obrigatório';
        } elseif (!preg_match('/^[A-Z]{2}$/', $medicoRequest->getUfcrm())) {
            $errors['UFCRM'] = 'UFCRM deve ter 2 letras';
        }

        if ($errors !== []) {
            throw new ValidationException('Dados inválidos', $errors);
        }
    }
}
