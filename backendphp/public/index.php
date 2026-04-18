<?php

declare(strict_types=1);

use App\Config\AppConfig;
use App\Config\Database;
use App\Exceptions\ExceptionHandler;
use App\Http\JsonResponse;
use App\Http\Request;
use App\Medicos\MedicoController;
use App\Medicos\MedicoMapper;
use App\Medicos\MedicoRepository;
use App\Medicos\MedicoRequestValidator;
use App\Medicos\MedicoService;
use App\Routing\Router;

require __DIR__ . '/../bootstrap.php';

$appConfig = AppConfig::fromEnvironment();
$request = Request::fromGlobals();

JsonResponse::prepareDefaultHeaders($appConfig, $request);

$exceptionHandler = new ExceptionHandler($appConfig);

try {
    if ($request->getMethod() === 'OPTIONS') {
        JsonResponse::sendNoContent();
        exit;
    }

    $database = new Database($appConfig);
    $repository = new MedicoRepository($database->getConnection());
    $mapper = new MedicoMapper();
    $validator = new MedicoRequestValidator();
    $service = new MedicoService($repository, $mapper);
    $controller = new MedicoController($service, $validator);

    $router = new Router();
    $router->get('/api/v1/medicos', [$controller, 'index']);
    $router->get('/api/v1/medicos/{id}', [$controller, 'show']);
    $router->post('/api/v1/medicos', [$controller, 'create']);
    $router->put('/api/v1/medicos/{id}', [$controller, 'update']);
    $router->delete('/api/v1/medicos/{id}', [$controller, 'delete']);

    $router->dispatch($request);
} catch (Throwable $throwable) {
    $exceptionHandler->handle($throwable, $request);
}
