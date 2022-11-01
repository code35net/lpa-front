import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const QUESTIONGROUP_URL = `${API_URL}/QuestionGroup`
const GET_QUESTIONGROUPS_URL = `${API_URL}/QuestionGroup`


const listQuestionCategories = async (): Promise<any> => await axios.get(`${GET_QUESTIONGROUPS_URL}?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });

const getQuestionGroups = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_QUESTIONGROUPS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getQuestionGroupById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${QUESTIONGROUP_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createQuestionGroup = (QuestionGroup: Model): Promise<Model | undefined> => {
  return axios
    .put(QUESTIONGROUP_URL, QuestionGroup)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateQuestionGroup = (QuestionGroup: Model): Promise<Model | undefined> => {
  return axios
    .post(`${QUESTIONGROUP_URL}/${QuestionGroup.id}`, QuestionGroup)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteQuestionGroup = (QuestionGroupId: ID): Promise<void> => {
  return axios.delete(`${QUESTIONGROUP_URL}/${QuestionGroupId}`).then(() => {})
}

const deleteSelectedQuestionGroups = (QuestionGroupIds: Array<ID>): Promise<void> => {
  const requests = QuestionGroupIds.map((id) => axios.delete(`${QUESTIONGROUP_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getQuestionGroups, deleteQuestionGroup, deleteSelectedQuestionGroups, getQuestionGroupById, createQuestionGroup, updateQuestionGroup, listQuestionCategories}
