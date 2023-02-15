import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse, TermUser} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/CourseTerm`
const THERMUSER_URL = `${API_URL}/TermUser`
const THERMUSERDELETE_URL = `${API_URL}/Custom/deleteTermUser`
const GET_TERM_USERS_URL = `${API_URL}/Custom/listTermUsers`

const getThings = (query: string, courseId: number): Promise<QueryResponse> => {
  return axios
    .get(`${THING_URL}/getAll/CourseId-${courseId}?${query}&modelstoinclude=Course`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}


const listTermUsers = async (termid: number): Promise<any> =>
    await axios.get(`${GET_TERM_USERS_URL}?termId=${termid}`).then((res: AxiosResponse) => {
        return res.data
    })

const listThings = async (): Promise<any> =>
await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
  return res.data
})

const listCourseTerms = async (courseId: number): Promise<any> =>
    await axios.get(`${THING_URL}/getAll/CourseId-${courseId}?modelstoinclude=Course`).then((res: AxiosResponse) => {
        return res.data
    })

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .put(THING_URL, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}
const createThermUser = (thing: TermUser): Promise<Model | undefined> => {
    return axios
        .put(THERMUSER_URL, thing)
        .then((response: AxiosResponse<Response<Model>>) => response.data)
        .then((response: Response<Model>) => response.data)
}
const deleteThermUser = (userId: string, termId: number): Promise<void> => {
    return axios.delete(`${THERMUSERDELETE_URL}?userId=${userId}&termId=${termId}`).then(() => { })
}

const updateThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .post(`${THING_URL}/${thing.id}`, thing)
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
  updateThing,
    listThings,
    listTermUsers,
    createThermUser, deleteThermUser, listCourseTerms
}
