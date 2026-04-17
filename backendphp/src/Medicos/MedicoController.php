<?php

declare(strict_types=1);

namespace App\Medicos;

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
}
