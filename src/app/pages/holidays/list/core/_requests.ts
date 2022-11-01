import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const HOLIDAY_URL = `${API_URL}/Holiday`
const GET_HOLIDAYS_URL = `${API_URL}/Holiday`

const listHolidays = async (): Promise<any> => await axios.get(`${GET_HOLIDAYS_URL}?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getHolidays = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_HOLIDAYS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}


const getHolidaysById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${HOLIDAY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createHoliday = (Holiday: Model): Promise<Model | undefined> => {
  return axios
    .put(HOLIDAY_URL, Holiday)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateHoliday = (Holiday: Model): Promise<Model | undefined> => {
  return axios
    .post(`${HOLIDAY_URL}/${Holiday.id}`, Holiday)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteHoliday = (AuditCategoryId: ID): Promise<void> => {
  return axios.delete(`${HOLIDAY_URL}/${AuditCategoryId}`).then(() => {})
}

const deleteSelectedHoliday = (HolidayIds: Array<ID>): Promise<void> => {
  const requests = HolidayIds.map((id) => axios.delete(`${HOLIDAY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getHolidays, deleteHoliday, deleteSelectedHoliday, getHolidaysById, createHoliday, updateHoliday, listHolidays}
