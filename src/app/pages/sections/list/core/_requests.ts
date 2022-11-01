import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'


const API_URL = process.env.REACT_APP_API_URL
const SECTION_URL = `${API_URL}/Section`
const GET_SECTIONS_URL = `${API_URL}/Custom/getSection`
const CREATE_SECTIONS_URL = `${API_URL}/Custom`


const listSections = async (departmentId : string): Promise<any> => await axios.get(`${GET_SECTIONS_URL}?page=1&departmentId=${departmentId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getSections = (query: string): Promise<QueryResponse> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).departmentId
  return axios.get(`${GET_SECTIONS_URL}?${query}&departmentId=${qsd}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getSectionById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${SECTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createSection = (section: Model): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).departmentId ?? "1"
  section.departmentId = parseInt(qsd?.toString())

  return axios
  .put(`${CREATE_SECTIONS_URL}/createSection`, section)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateSection = (section: Model): Promise<Model | undefined> => {
  return axios
    .post(`${SECTION_URL}/${section.id}`, section)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteSection = (sectionId: ID): Promise<void> => {
  return axios.delete(`${SECTION_URL}/${sectionId}`).then(() => {})
}

const deleteSelectedSections = (sectionIds: Array<ID>): Promise<void> => {
  const requests = sectionIds.map((id) => axios.delete(`${SECTION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getSections, deleteSection, deleteSelectedSections, getSectionById, createSection, updateSection, listSections}
