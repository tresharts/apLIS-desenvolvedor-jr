<?php

declare(strict_types=1);

namespace App\Routing;

use App\Exceptions\MethodNotAllowedException;
use App\Exceptions\NotFoundException;
use App\Http\Request;

final class Router
{
    /**
     * @var array<int, array{method: string, path: string, handler: callable}>
     */
    private array $routes = [];

    public function get(string $path, callable $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }

    public function dispatch(Request $request): void
    {
        $matchedPath = false;

        foreach ($this->routes as $route) {
            if ($route['path'] !== $request->getPath()) {
                continue;
            }

            $matchedPath = true;

            if ($route['method'] === $request->getMethod()) {
                ($route['handler'])($request);
                return;
            }
        }

        if ($matchedPath) {
            throw new MethodNotAllowedException();
        }

        throw new NotFoundException();
    }

    private function addRoute(string $method, string $path, callable $handler): void
    {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler,
        ];
    }
}
