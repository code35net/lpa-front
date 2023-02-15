import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, CourseUserModel, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Course`
const USER_THING_URL = `${API_URL}/CourseUser`

const getThings = (query: any): Promise<QueryResponse> => {
  return axios
      .get(`${API_URL}/Custom/getUserTermCourses?query=${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (): Promise<any> =>
  await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    return res.data
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

export {
  getThings,
  getThingById,
  listThings,
  createCourseUser
}
