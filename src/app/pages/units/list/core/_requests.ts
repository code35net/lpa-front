import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'


const API_URL = process.env.REACT_APP_API_URL
const UNIT_URL = `${API_URL}/Unit`
const GET_UNITS_URL = `${API_URL}/Custom/getUnit`
const GET_PARTIALUNITS_URL = `${API_URL}/Custom/getPartialUnit`
const CREATE_UNITS_URL = `${API_URL}/Custom`

const listUnits = async (sectionId : string): Promise<any> => await axios.get(`${GET_UNITS_URL}?page=1&sectionId=${sectionId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

 const listPartialUnits = async (sectionId : string, unitType:number): Promise<any> => await axios.get(`${GET_PARTIALUNITS_URL}?page=1&unitType=${unitType}&sectionId=${sectionId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getUnits = (query: string): Promise<QueryResponse> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
  return axios.get(`${GET_UNITS_URL}?${query}&sectionId=${qsd}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getUnitById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${UNIT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createUnit = (unit: Model): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
  return axios
  .put(`${CREATE_UNITS_URL}/createUnit?sectionId=${qsd}`, unit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateUnit = (unit: Model): Promise<Model | undefined> => {
  return axios
    .post(`${UNIT_URL}/${unit.id}`, unit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteUnit = (unitId: ID): Promise<void> => {
  return axios.delete(`${UNIT_URL}/${unitId}`).then(() => {})
}

const deleteSelectedUnits = (unitIds: Array<ID>): Promise<void> => {
  const requests = unitIds.map((id) => axios.delete(`${UNIT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUnits, deleteUnit, deleteSelectedUnits, getUnitById, createUnit, updateUnit, listUnits, listPartialUnits}
