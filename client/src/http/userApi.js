import { $authHost, $host } from ".";
import {jwtDecode} from "jwt-decode"

export const registration = async(user) => {

	const {data} = await $host.post('/api/users/registration', user)
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const login = async(user) => {
	const {data} = await $host.post('/api/users/login', user)
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const check = async() => {
	const {data} = await $authHost.get('/api/users/check')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const auth = async(token) => {
	try {
		let user = jwtDecode(token)
		let userId = user.id
		let tokenVersion = user.tokenVersion
		const response = await $host.post('/api/users/auth', {userId, tokenVersion})
		return (response)
	} catch (error) {
		console.log(error);
	}
}