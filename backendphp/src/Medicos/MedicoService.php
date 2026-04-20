<?php

declare(strict_types=1);

namespace App\Medicos;

use App\Exceptions\BusinessRuleException;
use App\Exceptions\NotFoundException;
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

    public function findById(int $id): MedicoResponse
    {
        return $this->medicoMapper->fromDatabaseRow($this->findMedicoRowOrFail($id));
    }

    public function update(int $id, MedicoRequest $medicoRequest): MedicoResponse
    {
        $this->findMedicoRowOrFail($id);

        if ($this->medicoRepository->existsByCrmAndUfcrmExceptId(
            $medicoRequest->getCrm(),
            $medicoRequest->getUfcrm(),
            $id
        )) {
            throw new BusinessRuleException('Médico já cadastrado');
        }

        $this->medicoRepository->update($id, $medicoRequest);

        return $this->findById($id);
    }

    public function delete(int $id): void
    {
        $this->findMedicoRowOrFail($id);
        $this->medicoRepository->delete($id);
    }

    private function findMedicoRowOrFail(int $id): array
    {
        $medico = $this->medicoRepository->findById($id);

        if ($medico === null) {
            throw new NotFoundException('Médico não encontrado');
        }

        return $medico;
    }
}
