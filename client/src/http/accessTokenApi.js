import { $authHost, $host } from ".";
import {jwtDecode} from "jwt-decode"

export const createAccessToken = async() => {

	const {data} = await $host.get('/api/accessToken/create')
	localStorage.setItem('accessToken', data.token)
	return (data.token)
}
export const getLastAccessToken = async() => {
	const {data} = await $host.get('/api/accessToken/getLast')
	localStorage.setItem('accessToken', data.lastToken)
	return (data.lastToken)
}

export const 	checkToken = async(token) => {
   const {data} = await $host.get(`/api/accessToken/checkToken/${token}`)
   localStorage.setItem('accessToken', data.token)
   return (data.response)
}