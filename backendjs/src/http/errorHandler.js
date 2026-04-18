const AppError = require('../errors/AppError');

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({
      message: 'JSON inválido',
      errors: {
        body: 'O corpo da requisição precisa estar em JSON válido.',
      },
    });
  }

  if (error instanceof AppError) {
    const payload = {
      message: error.message,
    };

    if (error.details) {
      payload.errors = error.details;
    }

    return response.status(error.statusCode).json(payload);
  }

  console.error('[backendjs] erro não tratado', {
    method: request.method,
    path: request.originalUrl,
    message: error.message,
  });

  return response.status(500).json({
    message: 'Erro interno do servidor',
  });
}

module.exports = {
  errorHandler,
};
