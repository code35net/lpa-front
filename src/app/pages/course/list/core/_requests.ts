import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, CourseUserModel, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Course`
const USER_THING_URL = `${API_URL}/CourseUser`

const getThings = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${THING_URL}/getAll/?${query}&modelstoinclude=Survey`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (): Promise<any> =>
  await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const listSomeThings = async (): Promise<any> =>
  await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    console.log(res.data.data.filter((a:Model) => a.isExercise == false))
    return res.data.data.filter((a:Model) => a.isExercise == false)
  })

  const createCourseUser = (thing: CourseUserModel): Promise<CourseUserModel | undefined> => {
    return axios
      .put(USER_THING_URL, thing)
      .then((response: AxiosResponse<Response<CourseUserModel>>) => response.data)
      .then((response: Response<CourseUserModel>) => response.data)
  }

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
  listSomeThings,
  createCourseUser
}
