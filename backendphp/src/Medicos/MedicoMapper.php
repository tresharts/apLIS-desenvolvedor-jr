<?php

declare(strict_types=1);

namespace App\Medicos;

final class MedicoMapper
{
    public function fromDatabaseRow(array $medico): MedicoResponse
    {
        return new MedicoResponse(
            (int) $medico['id'],
            (string) $medico['nome'],
            (string) $medico['crm'],
            (string) $medico['uf_crm'],
        );
    }
}
