import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const DEPARTMENT_URL = `${API_URL}/Department`
const GET_DEPARTMENTS_URL = `${API_URL}/Department`
const GET_PER_REPORT = `${API_URL}/Custom/getPercentageReport`

const getDepartments = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${GET_DEPARTMENTS_URL}/getAll/?${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getPercentageReport = (): Promise<QueryResponse> => {
  return axios
    .get(`${GET_PER_REPORT}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}


const listDepartments = async (): Promise<any> =>
  await axios.get(`${GET_DEPARTMENTS_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getDepartmentById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${DEPARTMENT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createDepartment = (department: Model): Promise<Model | undefined> => {
  return axios
    .put(DEPARTMENT_URL, department)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateDepartment = (department: Model): Promise<Model | undefined> => {
  return axios
    .post(`${DEPARTMENT_URL}/${department.id}`, department)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteDepartment = (departmentId: ID): Promise<void> => {
  return axios.delete(`${DEPARTMENT_URL}/${departmentId}`).then(() => {})
}

const deleteSelectedDepartments = (departmentIds: Array<ID>): Promise<void> => {
  const requests = departmentIds.map((id) => axios.delete(`${DEPARTMENT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getDepartments,
  deleteDepartment,
  deleteSelectedDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  listDepartments,
  getPercentageReport
}
