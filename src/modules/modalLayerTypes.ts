import type { AuthModalPayload } from './auth'

export interface ShowFunctionTypes {
  (name: 'auth', payload: AuthModalPayload): void
}
