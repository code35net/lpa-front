import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse, QueryResponse2} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Question`
const ANSWERTEMPLATE_OPTIONS_URL = `${API_URL}/AnswerTemplateOption`
const CUSTOM_THING_URL = `${API_URL}/Custom/addQuestion`
const CUSTOM_GET_VISUAL_URL = `${API_URL}/Custom/getVisualUrl`


const getThings = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${THING_URL}/getAll/?${query}&modelstoinclude=Topic.Course,AnswerTemplate`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getQuestionOptions = (query: string): Promise<QueryResponse2> => {
  return axios
    .get(`${ANSWERTEMPLATE_OPTIONS_URL}/getAll/QuestionId-${query}`)
    .then((d: AxiosResponse<QueryResponse2>) => d.data)
}
const getVisualUrl = async (vid: number, library: string): Promise<any> =>
    await axios.get(`${CUSTOM_GET_VISUAL_URL}?vid=${vid}&library=${library}`).then((res: AxiosResponse) => {
        return `${(API_URL || "").slice(0, -4)}/${res.data}`
    })
const getVisualThings = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${THING_URL}/getAll/?${query}&modelstoinclude=Topic.Course,AnswerTemplate,Library`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (): Promise<any> =>
  await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}?modelstoinclude=Topic`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .put(THING_URL, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const createCustomThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .put(CUSTOM_THING_URL, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .put(`${CUSTOM_THING_URL}`, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteThing = (thingId: ID): Promise<void> => {
  return axios.delete(`${THING_URL}/${thingId}`).then(() => {})
}

const deleteSelectedThings = (thingIds: Array<ID>): Promise<void> => {
  const requests = thingIds.map((id) => axios.delete(`${THING_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getThings,
  deleteThing,
  deleteSelectedThings,
  getThingById,
  createThing,
  createCustomThing,
  updateThing,
  listThings,
  getVisualThings,
  getQuestionOptions,
  getVisualUrl
}
