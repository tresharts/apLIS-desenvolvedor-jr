<?php

declare(strict_types=1);

namespace App\Medicos;

final class MedicoRequest
{
    private function __construct(
        private readonly string $nome,
        private readonly string $crm,
        private readonly string $ufcrm,
    ) {
    }

    public static function fromArray(array $payload): self
    {
        return new self(
            trim((string) ($payload['nome'] ?? '')),
            trim((string) ($payload['CRM'] ?? '')),
            strtoupper(trim((string) ($payload['UFCRM'] ?? ''))),
        );
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function getCrm(): string
    {
        return $this->crm;
    }

    public function getUfcrm(): string
    {
        return $this->ufcrm;
    }
}
