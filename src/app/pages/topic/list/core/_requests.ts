import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Topic`

// const getThings = (query: string): Promise<QueryResponse> => {
//   const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).courseId
//   return axios
//     .get(`${THING_URL}/getAll/CourseId-${qsd}?${query}&modelstoinclude=Course`)
//     .then((d: AxiosResponse<QueryResponse>) => d.data)
// }

const getThings = (query: string): Promise<QueryResponse> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).courseId
  return axios
  .get(`${THING_URL}/getAll/CourseId-${qsd}?${query}&modelstoinclude=Course`)
  .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (courseId: number): Promise<any> =>
  await axios.get(`${THING_URL}/getAll/CourseId-${courseId}?page=1&items_per_page=999`).then((res: AxiosResponse) => {
    return res.data
  })

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createThing = (thing: Model): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).courseId ?? "1"
  thing.courseId = parseInt(qsd?.toString())
  return axios
    .put(THING_URL, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
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
  listThings
}