export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  email: string
  isEmailConfirmed: boolean
}
