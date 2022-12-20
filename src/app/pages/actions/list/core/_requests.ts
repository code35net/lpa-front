import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const ACTION_URL = `${API_URL}/Auction`
const GET_ACTIONS_URL = `${API_URL}/Custom/getAuctions`
const SAVE_ACTIONS_URL = `${API_URL}/Custom/saveActions`
const GET_ACTION_DETAIL_URL = `${API_URL}/Custom/getAuctions`
const ACTION_DETAILS_URL = `${API_URL}/Custom/getAuctionDetail`


// const getAuctionDetails = async (actionCode : string): Promise<any> => await axios.get(`${ACTION_DETAILS_URL}/${actionCode}`).then((res : AxiosResponse) => 
//  {
//    return res.data;
//  });

 const getAuctionDetails = async (actionCode : string): Promise<any> => await axios.get(`${ACTION_DETAILS_URL}?actionCode=${actionCode}`).then((res : AxiosResponse) => 
 {
   return res.data;
 }
 
 );

 const saveAction = (action: any) => {
  return axios
    .put(SAVE_ACTIONS_URL, action, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response: any) => response.data)
}


const getActions = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${GET_ACTIONS_URL}/?${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listActions = async (): Promise<any> =>
  await axios.get(`${GET_ACTIONS_URL}/getAll?page=1`).then((res: AxiosResponse) => {
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
  getAuctionDetails,saveAction
}
