import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const ACTION_URL = `${API_URL}/Action`
const GET_ACTIONS_URL = `${API_URL}/Custom/getAuctions`
const ACTION_DETAILS_URL = `${API_URL}/Custom/getAuctionDetail`


const getAuctionDetails = async (id : string): Promise<any> => await axios.get(`${ACTION_DETAILS_URL}?Id=${id}`).then((res : AxiosResponse) => 
 {
   return res.data;
 });


const getActions = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${GET_ACTIONS_URL}?${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listActions = async (): Promise<any> =>
  await axios.get(`${GET_ACTIONS_URL}?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getActionById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${ACTION_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createAction = (action: Model): Promise<Model | undefined> => {
  return axios
    .put(ACTION_URL, action)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAction = (action: Model): Promise<Model | undefined> => {
  return axios
    .post(`${ACTION_URL}/${action.id}`, action)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteAction = (actionId: ID): Promise<void> => {
  return axios.delete(`${ACTION_URL}/${actionId}`).then(() => {})
}

const deleteSelectedActions = (actionIds: Array<ID>): Promise<void> => {
  const requests = actionIds.map((id) => axios.delete(`${ACTION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getActions,
  deleteAction,
  deleteSelectedActions,
  getActionById,
  createAction,
  updateAction,
  listActions,
  getAuctionDetails
}
