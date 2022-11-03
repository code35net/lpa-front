import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const AUDITCATEGORY_URL = `${API_URL}/AuditCategory`
const GET_AUDITCATEGORIES_URL = `${API_URL}/AuditCategory`

const listAuditCategories = async (): Promise<any> => await axios.get(`${GET_AUDITCATEGORIES_URL}/getAll?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getAuditCategories = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_AUDITCATEGORIES_URL}/getAll/?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}


const getAuditCategoriesById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${AUDITCATEGORY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createAuditCategory = (AuditCategory: Model): Promise<Model | undefined> => {
  return axios
    .put(AUDITCATEGORY_URL, AuditCategory)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAuditCategory = (AuditCategory: Model): Promise<Model | undefined> => {
  return axios
    .post(`${AUDITCATEGORY_URL}/${AuditCategory.id}`, AuditCategory)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteAuditCategory = (AuditCategoryId: ID): Promise<void> => {
  return axios.delete(`${AUDITCATEGORY_URL}/${AuditCategoryId}`).then(() => {})
}

const deleteSelectedAuditCategories = (AuditCategoryIds: Array<ID>): Promise<void> => {
  const requests = AuditCategoryIds.map((id) => axios.delete(`${AUDITCATEGORY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getAuditCategories, deleteAuditCategory, deleteSelectedAuditCategories, getAuditCategoriesById, createAuditCategory, updateAuditCategory, listAuditCategories}
