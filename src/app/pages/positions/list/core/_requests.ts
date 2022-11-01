import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const POSITION_URL = `${API_URL}/Position`
const GET_POSITIONS_URL = `${API_URL}/Position`

const listPositions = async (): Promise<any> => await axios.get(`${GET_POSITIONS_URL}?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getPlaces = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_POSITIONS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getPlaceById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${POSITION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createPlace = (position: Model): Promise<Model | undefined> => {
  return axios
    .put(POSITION_URL, position)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updatePlace = (position: Model): Promise<Model | undefined> => {
  return axios
    .post(`${POSITION_URL}/${position.id}`, position)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deletePlace = (placeId: ID): Promise<void> => {
  return axios.delete(`${POSITION_URL}/${placeId}`).then(() => {})
}

const deleteSelectedPlaces = (placeIds: Array<ID>): Promise<void> => {
  const requests = placeIds.map((id) => axios.delete(`${POSITION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getPlaces, deletePlace, deleteSelectedPlaces, getPlaceById, createPlace, updatePlace, listPositions}
