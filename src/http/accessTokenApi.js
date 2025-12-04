// Mock token for development
const MOCK_ACCESS_TOKEN = "mock_access_token_12345";

export const createAccessToken = async () => {
	localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN)
	return (MOCK_ACCESS_TOKEN)
}
export const getLastAccessToken = async () => {
	localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN)
	return (MOCK_ACCESS_TOKEN)
}

export const checkToken = async (token) => {
	localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN)
	return ({ message: "Token valid" })
}