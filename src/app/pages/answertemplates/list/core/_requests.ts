import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const ANSWERTEMPLATE_URL = `${API_URL}/AnswerTemplate`
const GET_ANSWERTEMPLATES_URL = `${API_URL}/AnswerTemplate`
const GET_ANSWERTEMPLATEOPTIONS_URL = `${API_URL}/AnswerTemplateOption`
const CREATE_ANSWERTEMPLATE_URL = `${API_URL}/Custom/createATemplate`
//api/AnswerTemplate/{id}/AnswerTemplateOptions

const listAnswerTemplates = async (): Promise<any> => await axios.get(`${GET_ANSWERTEMPLATES_URL}/getAll?page=1`).then((res : AxiosResponse) => 
 {
   return res.data;
 });


 const getAnswerTemplateOptions = async (id:ID): Promise<any> => await axios.get(`${GET_ANSWERTEMPLATEOPTIONS_URL}/getAll/AnswerTemplateId-${id}?modelstoinclude=AnswerTemplate`).then((res : AxiosResponse) => 
 {
   return res.data;
 });



const getAnswerTemplates = (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_ANSWERTEMPLATES_URL}/getAll/?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}


const getAnswerTemplatesById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${GET_ANSWERTEMPLATEOPTIONS_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createAnswerTemplate = (AnswerTemplate: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_ANSWERTEMPLATE_URL, AnswerTemplate)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAnswerTemplate = (AnswerTemplate: Model): Promise<Model | undefined> => {
  return axios
    .post(`${ANSWERTEMPLATE_URL}/${AnswerTemplate.id}`, AnswerTemplate)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteAnswerTemplates = (AnswerTemplateId: ID): Promise<void> => {
  return axios.delete(`${ANSWERTEMPLATE_URL}/${AnswerTemplateId}`).then(() => {})
}

const deleteSelectedAnswerTemplates = (AnswerTemplateIds: Array<ID>): Promise<void> => {
  const requests = AnswerTemplateIds.map((id) => axios.delete(`${ANSWERTEMPLATE_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getAnswerTemplateOptions,getAnswerTemplates, deleteAnswerTemplates, deleteSelectedAnswerTemplates, getAnswerTemplatesById, createAnswerTemplate, updateAnswerTemplate, listAnswerTemplates}
