import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const ROLE_URL = `${API_URL}/Custom/getAllRole`
const GET_ROLES_URL = `${API_URL}/Custom/getAllRole`
const GET_ROLES_CLAIMS_URL = `${API_URL}/Custom/getRoleClaims`

const SET_ROLE_CLAIMS_URL = `${API_URL}/Custom/setClaimForRole`
const getRoles = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_ROLES_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listRoles = async (): Promise<any> =>
  await axios.get(`${GET_ROLES_URL}?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getRoleClaims = async (id: ID): Promise<any> =>
  await axios.get(`${GET_ROLES_CLAIMS_URL}?roleId=${id}`).then((res: AxiosResponse) => {
    return res.data
  })

const setClaimForRole = async (requestBody: any): Promise<any> =>
  await axios.post(`${SET_ROLE_CLAIMS_URL}`, requestBody).then((res: AxiosResponse) => {
    return res.data
  })

const getRoleById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${ROLE_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createRole = (role: Model): Promise<Model | undefined> => {
  return axios
    .put(ROLE_URL, role)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateRole = (role: Model): Promise<Model | undefined> => {
  return axios
    .post(`${ROLE_URL}/${role.id}`, role)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteRole = (roleId: ID): Promise<void> => {
  return axios.delete(`${ROLE_URL}/${roleId}`).then(() => {})
}

const deleteSelectedRoles = (roleIds: Array<ID>): Promise<void> => {
  const requests = roleIds.map((id) => axios.delete(`${ROLE_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getRoles,
  deleteRole,
  deleteSelectedRoles,
  getRoleById,
  createRole,
  updateRole,
  listRoles,
  getRoleClaims,
  setClaimForRole,
}
