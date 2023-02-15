import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/Custom/getUserById`
const REGISTER_USER_URL = `${API_URL}/Auth/register`
const UPDATE_USER_URL = `${API_URL}/Auth/update-user`
const GET_USERS_URL = `${API_URL}/Custom/getUser`
const GET_USER_DETAILS_URL = `${API_URL}/Custom/getUserDetail`
const GET_USER_CLAIMS_URL = `${API_URL}/Custom/getUserClaims`
const SET_USER_CLAIMS_URL = `${API_URL}/Custom/setClaimForUser`

const getUserDetails = async (id : string): Promise<any> => await axios.get(`${GET_USER_DETAILS_URL}?Id=${id}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const listUsers = async (): Promise<any> =>
  await axios.get(`${GET_USERS_URL}?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getUsers = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_USERS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}


const getUserClaims = async (id: ID): Promise<any> =>
  await axios.get(`${GET_USER_CLAIMS_URL}?userId=${id}`).then((res: AxiosResponse) => {
    return res.data
  })

const setClaimForUser = async (requestBody : any): Promise<any> =>
  await axios.post(`${SET_USER_CLAIMS_URL}`,requestBody).then((res: AxiosResponse) => {
    return res.data
  })

// const getUserById = (id: ID): Promise<Model | undefined> => {
//   return axios
//     .get(`${USER_URL}/${id}`)
//     .then((response: AxiosResponse<Response<Model>>) => response.data)
//     .then((response: Response<Model>) => response as any)
// }

const getUserById = (id: ID): Promise<Model | undefined> => {
  return axios.get(`${USER_URL}/${id}`).then((response: any) => response.data)
}


const createUser = (user: Model): Promise<Model | undefined> => {
  return axios
    .put(REGISTER_USER_URL, user)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateUser = (user: Model): Promise<Model | undefined> => {
  return axios
    .post(`${UPDATE_USER_URL}`, user)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  listUsers,
  getUserClaims,
  setClaimForUser,
  getUserDetails
}
