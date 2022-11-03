import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const STAFF_URL = `${API_URL}/StaffList`
const GET_STAFFS_URL = `${API_URL}/StaffList`

const listStaffs = async (): Promise<any> => await axios.get(`${GET_STAFFS_URL}/getAll?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getStaffs = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_STAFFS_URL}/getAll/?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}



const getStaffsById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${STAFF_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createStaff = (Staff: Model): Promise<Model | undefined> => {
  return axios
    .put(STAFF_URL, Staff)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateStaff = (Staff: Model): Promise<Model | undefined> => {
  return axios
    .post(`${STAFF_URL}/${Staff.id}`, Staff)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteStaff = (StaffId: ID): Promise<void> => {
  return axios.delete(`${STAFF_URL}/${StaffId}`).then(() => {})
}

const deleteSelectedStaffs = (StaffIds: Array<ID>): Promise<void> => {
  const requests = StaffIds.map((id) => axios.delete(`${STAFF_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getStaffs, deleteStaff, deleteSelectedStaffs, getStaffsById, createStaff, updateStaff, listStaffs}
