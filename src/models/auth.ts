export interface User {
  id: string
  name: string
}

export interface LoginFormData {
  userId: string
  userName: string
}

export interface LoginFormErrors {
  userId?: string
  userName?: string
}