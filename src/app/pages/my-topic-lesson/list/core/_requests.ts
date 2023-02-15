import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Lesson`
const ADD_THING_URL = `${API_URL}/Custom/addLesson`
const GET_LESSON_URL = `${API_URL}/Custom/getLessonUrl`
const SET_LESSON_POSITION_URL = `${API_URL}/Custom/setLessonPosition`
const GET_LESSON_POSITION_URL = `${API_URL}/Custom/getLessonPosition`
const GET_LESSON_Type_URL = `${API_URL}/Custom/getLessonType`


const getThings = (query: string): Promise<QueryResponse> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).topicId
  return axios
  .get(`${THING_URL}/getAll/TopicId-${qsd}?${query}&modelstoinclude=Topic`)
  .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (topicId: number): Promise<any> =>
  await axios.get(`${THING_URL}/getAll/TopicId-${topicId}?page=1&items_per_page=999`).then((res: AxiosResponse) => {
    return res.data
  })

const getLessonUrl = async (lid: number): Promise<any> =>
    await axios.get(`${GET_LESSON_URL}?lid=${lid}`).then((res: AxiosResponse) => {
        return `${(API_URL || "").slice(0, -4)}/${res.data}`
    })
const getLessonPosition = async (lid: number): Promise<any> =>
    await axios.get(`${GET_LESSON_POSITION_URL}?lid=${lid}`).then((res: AxiosResponse) => {
        return res.data
    })
const getLessonType = async (lid: number): Promise<any> =>
    await axios.get(`${GET_LESSON_Type_URL}?lid=${lid}`).then((res: AxiosResponse) => {
        return res.data
    })
const setLessonPosition = async (lid: number, position: number): Promise<any> =>
    await axios.get(`${SET_LESSON_POSITION_URL}?lid=${lid}&position=${position}`).then((res: AxiosResponse) => {
        return 1
    })

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

// const createThing = (thing: Model): Promise<Model | undefined> => {
//   const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).topicId ?? "1"
//   thing.topicId = parseInt(qsd?.toString())
//   return axios
//     .put(THING_URL, thing)
//     .then((response: AxiosResponse<Response<Model>>) => response.data)
//     .then((response: Response<Model>) => response.data)
// }

const createThing = (thing: any): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).topicId ?? "1"
  thing.topicId = parseInt(qsd?.toString())

  const formData = new FormData()
      formData.append('file', thing.file)

      formData.append('name', thing.name)
      formData.append('topicId', thing.topicId)

  return axios
  .put(ADD_THING_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
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
    listThings,
    getLessonUrl,
    setLessonPosition,
    getLessonPosition,
    getLessonType
}
