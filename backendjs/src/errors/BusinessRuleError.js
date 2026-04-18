const AppError = require('./AppError');

class BusinessRuleError extends AppError {
  constructor(message, details = null) {
    super(message, 409, details);
  }
}

module.exports = BusinessRuleError;
