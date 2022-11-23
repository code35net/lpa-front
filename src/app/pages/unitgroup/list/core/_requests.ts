import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const UNITGROUP_URL = `${API_URL}/UnitGroup`
const GET_UNITGROUPS_URL = `${API_URL}/UnitGroup`

const listUnitGroups = async (): Promise<any> => await axios.get(`${GET_UNITGROUPS_URL}/getAll?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getPlaces = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_UNITGROUPS_URL}/getAll/?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getPlaceById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${UNITGROUP_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createPlace = (unitgroup: Model): Promise<Model | undefined> => {
  return axios
    .put(UNITGROUP_URL, unitgroup)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updatePlace = (unitgroup: Model): Promise<Model | undefined> => {
  return axios
    .post(`${UNITGROUP_URL}/${unitgroup.id}`, unitgroup)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deletePlace = (placeId: ID): Promise<void> => {
  return axios.delete(`${UNITGROUP_URL}/${placeId}`).then(() => {})
}

const deleteSelectedPlaces = (placeIds: Array<ID>): Promise<void> => {
  const requests = placeIds.map((id) => axios.delete(`${UNITGROUP_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getPlaces, deletePlace, deleteSelectedPlaces, getPlaceById, createPlace, updatePlace, listUnitGroups}
