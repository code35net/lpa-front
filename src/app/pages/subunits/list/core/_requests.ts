import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'


const API_URL = process.env.REACT_APP_API_URL
const UNIT_URL = `${API_URL}/Unit`
const GET_UNITS_URL = `${API_URL}/Custom/getSubUnit`
const GET_PARTIALUNITS_URL = `${API_URL}/Custom/getUnit`
const CREATE_UNITS_URL = `${API_URL}/Custom/createBulkUnits`

const listUnits = async (sectionId : string): Promise<any> => await axios.get(`${UNIT_URL}/getAll/SectionId-${sectionId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });


 
 const listUnitGroups = async (sectionId : string): Promise<any> => await axios.get(`${GET_PARTIALUNITS_URL}?page=1&sectionId=${sectionId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });


 const createBulkUnits = (parameters: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_UNITS_URL, parameters)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const getSubUnits = (query: string): Promise<QueryResponse> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
  const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).parentUnitId
  return axios.get(`${GET_UNITS_URL}?sectionId=${qsd}&parentUnitId=${qsd2}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}


// const getUnits = (query: string): Promise<QueryResponse> => {
//   const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
//   const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).unitId
//   if(qsd2 == undefined)
//   return axios.get(`${GET_UNITS_URL}?sectionId=${qsd}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
//   else
//   return axios.get(`${GET_UNITS_URL}?sectionId=${qsd}&parentUnitId=${qsd2}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
// }


// const getUnits = (query: string): Promise<QueryResponse> => {
//   const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
//   const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).unitId
//   if(qsd2 == undefined)
//   return axios.get(`${GET_UNITS_URL}/getAll/SectionId-${qsd}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
//   else
//   return axios.get(`${GET_UNITS_URL}/getAll/ParentUnitId-${qsd2}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
// }

const getUnitsForDropdown = (): Promise<any> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
  return axios.get(`${UNIT_URL}/getAll/SectionId-${qsd}`).then((d: AxiosResponse<any>) => d.data as any)
}

const getUnitById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${UNIT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}




const createUnit = (unit: Model): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId ?? "1"
  const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).parentUnitId ?? "1"
  unit.sectionId = parseInt(qsd?.toString())
  unit.parentUnitId = parseInt(qsd2?.toString())

  return axios
  .put(`${UNIT_URL}`, unit)
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

export {getSubUnits, deleteUnit, deleteSelectedUnits, getUnitById, createUnit, updateUnit, listUnits, getUnitsForDropdown, createBulkUnits, listUnitGroups}
