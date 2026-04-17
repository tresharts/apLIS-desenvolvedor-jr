<?php

declare(strict_types=1);

namespace App\Medicos;

final class MedicoResponse
{
    public function __construct(
        private readonly int $id,
        private readonly string $nome,
        private readonly string $crm,
        private readonly string $ufcrm,
    ) {
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'CRM' => $this->crm,
            'UFCRM' => $this->ufcrm,
        ];
    }
}
