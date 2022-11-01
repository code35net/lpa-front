import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/Auth/get-user-by-token`
export const GET_TOKEN_URL = `${API_URL}/Auth/get-token`
export const LOGIN_URL = `${API_URL}/Auth/login`
export const REGISTER_URL = `${API_URL}/Auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/Auth/forgot_password`



// Server should return AuthModel
export function login(username: string, password: string) {
  return axios.post<AuthModel>(GET_TOKEN_URL, {
    username,
    password,
  })
}

// Server should return AuthModel
export function register(
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    username,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(username: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    username,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token
  })
}
