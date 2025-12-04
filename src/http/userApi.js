import { jwtDecode } from "jwt-decode"

// Mock token for development
const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb2NrQGVtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwidG9rZW5WZXJzaW9uIjoxLCJpYXQiOjE3MTIxMjM0NTYsImV4cCI6MTcxNDcxNjI1Nn0.mocksignature";

export const registration = async (user) => {
	localStorage.setItem('token', MOCK_TOKEN)
	return jwtDecode(MOCK_TOKEN)
}

export const login = async (user) => {
	localStorage.setItem('token', MOCK_TOKEN)
	return jwtDecode(MOCK_TOKEN)
}

export const loginGuest = async () => {
	localStorage.setItem('token', MOCK_TOKEN)
	return jwtDecode(MOCK_TOKEN)
}

export const check = async () => {
	localStorage.setItem('token', MOCK_TOKEN)
	return jwtDecode(MOCK_TOKEN)
}

export const auth = async (token) => {
	// Mock successful auth response
	return { status: 200, data: { message: "Authenticated" } }
}