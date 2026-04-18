<?php

declare(strict_types=1);

namespace App\Medicos;

use App\Exceptions\ValidationException;
use App\Http\JsonResponse;
use App\Http\Request;

final class MedicoController
{
    public function __construct(
        private readonly MedicoService $medicoService,
        private readonly MedicoRequestValidator $medicoRequestValidator,
    ) {
    }

    public function index(Request $request): void
    {
        $medicos = array_map(
            static fn ($medicoResponse) => $medicoResponse->toArray(),
            $this->medicoService->listAll()
        );

        JsonResponse::send($medicos);
    }

    public function create(Request $request): void
    {
        $medicoRequest = MedicoRequest::fromArray($request->getJsonBody());
        $this->medicoRequestValidator->validate($medicoRequest);

        $this->medicoService->create($medicoRequest);

        JsonResponse::send(['message' => 'Médico criado com sucesso'], 201);
    }

    public function show(Request $request): void
    {
        $medico = $this->medicoService->findById($this->resolveId($request));

        JsonResponse::send($medico->toArray());
    }

    public function update(Request $request): void
    {
        $medicoRequest = MedicoRequest::fromArray($request->getJsonBody());
        $this->medicoRequestValidator->validate($medicoRequest);

        $this->medicoService->update($this->resolveId($request), $medicoRequest);

        JsonResponse::send(['message' => 'Médico atualizado com sucesso']);
    }

    public function delete(Request $request): void
    {
        $this->medicoService->delete($this->resolveId($request));

        JsonResponse::send(['message' => 'Médico removido com sucesso']);
    }

    private function resolveId(Request $request): int
    {
        $id = $request->getRouteParam('id');

        if ($id === null || !ctype_digit($id) || (int) $id < 1) {
            throw new ValidationException('Dados inválidos', [
                'id' => 'Id inválido',
            ]);
        }

        return (int) $id;
    }
}
