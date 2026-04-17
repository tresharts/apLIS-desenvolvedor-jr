<?php

declare(strict_types=1);

namespace App\Medicos;

use App\Exceptions\BusinessRuleException;
use RuntimeException;

final class MedicoService
{
    public function __construct(
        private readonly MedicoRepository $medicoRepository,
        private readonly MedicoMapper $medicoMapper,
    ) {
    }

    public function listAll(): array
    {
        $medicos = $this->medicoRepository->findAll();

        return array_map(
            fn (array $medico) => $this->medicoMapper->fromDatabaseRow($medico),
            $medicos
        );
    }

    public function create(MedicoRequest $medicoRequest): MedicoResponse
    {
        if ($this->medicoRepository->existsByCrmAndUfcrm(
            $medicoRequest->getCrm(),
            $medicoRequest->getUfcrm()
        )) {
            throw new BusinessRuleException('Médico já cadastrado');
        }

        $medicoId = $this->medicoRepository->create($medicoRequest);
        $medicoCriado = $this->medicoRepository->findById($medicoId);

        if ($medicoCriado === null) {
            throw new RuntimeException('Não foi possível recuperar o médico criado');
        }

        return $this->medicoMapper->fromDatabaseRow($medicoCriado);
    }
}
