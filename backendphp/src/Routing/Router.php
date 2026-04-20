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

    public function put(string $path, callable $handler): void
    {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete(string $path, callable $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }

    public function dispatch(Request $request): void
    {
        $matchedPath = false;

        foreach ($this->routes as $route) {
            $routeParams = $this->matchPath($route['path'], $request->getPath());

            if ($routeParams === null) {
                continue;
            }

            $matchedPath = true;

            if ($route['method'] === $request->getMethod()) {
                $request->setRouteParams($routeParams);
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

    private function matchPath(string $routePath, string $requestPath): ?array
    {
        $pattern = preg_replace_callback(
            '#\{([a-zA-Z_][a-zA-Z0-9_]*)\}#',
            static fn (array $matches): string => '(?P<' . $matches[1] . '>[^/]+)',
            $routePath,
        );

        if ($pattern === null) {
            return null;
        }

        $result = preg_match('#^' . $pattern . '$#', $requestPath, $matches);

        if ($result !== 1) {
            return null;
        }

        $params = [];

        foreach ($matches as $key => $value) {
            if (!is_string($key)) {
                continue;
            }

            $params[$key] = $value;
        }

        return $params;
    }
}
