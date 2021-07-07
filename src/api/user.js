/**
 * Login and fetch jwt token.
 *
 * @param {string} username
 * @param {string} password
 *
 * @returns {Promise} axios request object
 */
export function login(username, password) {
  return window.axios.post(
    'login',
    {
      username: username,
      password: password,
    }
  )
}

/**
 * Refresh jwt token.
 *
 * @param {string} token jwt token
 * @returns axios request object
 */
export function refreshToken(token) {
  return window.axios.post(
    'refreshToken',
    {
      token: token
    }
  )
}