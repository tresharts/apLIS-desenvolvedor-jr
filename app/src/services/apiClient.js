class ApiClientError extends Error {
  constructor(message, status = 500, details = null, code = 'http_error') {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.details = details
    this.code = code
  }
}

async function parseResponseBody(response) {
  const rawBody = await response.text()

  if (!rawBody) {
    return null
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    return rawBody
  }
}

async function request(baseUrl, path, options = {}) {
  let response

  try {
    response = await fetch(new URL(path, baseUrl).toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    })
  } catch {
    throw new ApiClientError(
      'network_error',
      0,
      null,
      'network_error'
    )
  }

  const payload = await parseResponseBody(response)

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && payload.message
        ? payload.message
        : 'request_failed'

    const details =
      payload && typeof payload === 'object' ? payload.errors ?? null : null

    throw new ApiClientError(message, response.status, details)
  }

  return payload
}

function createApiClient(baseUrl) {
  return {
    get(path) {
      return request(baseUrl, path)
    },
    post(path, body) {
      return request(baseUrl, path, {
        method: 'POST',
        body: JSON.stringify(body),
      })
    },
  }
}

export { ApiClientError, createApiClient }
