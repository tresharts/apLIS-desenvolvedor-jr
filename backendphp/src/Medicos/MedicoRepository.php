<?php

declare(strict_types=1);

namespace App\Medicos;

use PDO;

final class MedicoRepository
{
    public function __construct(private readonly PDO $connection)
    {
    }

    public function findAll(): array
    {
        $statement = $this->connection->query(
            'SELECT id, nome, crm, uf_crm FROM medicos ORDER BY id ASC'
        );

        return $statement->fetchAll();
    }

    public function existsByCrmAndUfcrm(string $crm, string $ufcrm): bool
    {
        $statement = $this->connection->prepare(
            'SELECT id FROM medicos WHERE crm = :crm AND uf_crm = :uf_crm LIMIT 1'
        );

        $statement->execute([
            'crm' => $crm,
            'uf_crm' => $ufcrm,
        ]);

        return $statement->fetch() !== false;
    }

    public function existsByCrmAndUfcrmExceptId(string $crm, string $ufcrm, int $id): bool
    {
        $statement = $this->connection->prepare(
            'SELECT id FROM medicos WHERE crm = :crm AND uf_crm = :uf_crm AND id <> :id LIMIT 1'
        );

        $statement->execute([
            'crm' => $crm,
            'uf_crm' => $ufcrm,
            'id' => $id,
        ]);

        return $statement->fetch() !== false;
    }

    public function create(MedicoRequest $medicoRequest): int
    {
        $statement = $this->connection->prepare(
            'INSERT INTO medicos (nome, crm, uf_crm) VALUES (:nome, :crm, :uf_crm)'
        );

        $statement->execute([
            'nome' => $medicoRequest->getNome(),
            'crm' => $medicoRequest->getCrm(),
            'uf_crm' => $medicoRequest->getUfcrm(),
        ]);

        return (int) $this->connection->lastInsertId();
    }

    public function findById(int $id): ?array
    {
        $statement = $this->connection->prepare(
            'SELECT id, nome, crm, uf_crm FROM medicos WHERE id = :id LIMIT 1'
        );

        $statement->execute(['id' => $id]);

        $medico = $statement->fetch();

        return is_array($medico) ? $medico : null;
    }

    public function update(int $id, MedicoRequest $medicoRequest): void
    {
        $statement = $this->connection->prepare(
            'UPDATE medicos SET nome = :nome, crm = :crm, uf_crm = :uf_crm WHERE id = :id'
        );

        $statement->execute([
            'id' => $id,
            'nome' => $medicoRequest->getNome(),
            'crm' => $medicoRequest->getCrm(),
            'uf_crm' => $medicoRequest->getUfcrm(),
        ]);
    }

    public function delete(int $id): void
    {
        $statement = $this->connection->prepare('DELETE FROM medicos WHERE id = :id');
        $statement->execute(['id' => $id]);
    }
}
