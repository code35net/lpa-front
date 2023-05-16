import axios, {AxiosResponse} from 'axios'
import {ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'
import qs from 'qs'
import {useLocation} from 'react-router-dom'
import {useMemo} from 'react'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Unit`
const LIST_THING_URL = `${API_URL}/Custom/getPartialUnit`
const SOME_THING_URL = `${API_URL}/Custom/getSomeUnit`
const GET_PER_REPORT = `${API_URL}/Custom/getPercentageReport`
const UPDATE_UNIT = `${API_URL}/Custom/updateUnit`
const DELETE_UNIT = `${API_URL}/Custom/deleteUnit`

const getThings = (query: string): Promise<QueryResponse> => {
  //console.log(query)
  let q = query.split('id=')[1]

  if (q == undefined) q = '0'
  return axios
    .get(`${LIST_THING_URL}/${q}?${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (): Promise<any> =>
  await axios.get(`${LIST_THING_URL}/0`).then((res: AxiosResponse) => {
    return res.data
  })

const listOtherThings = async (q: number): Promise<any> =>
  await axios.get(`${LIST_THING_URL}/${q}?page=1&items_per_page=999`).then((res: AxiosResponse) => {
    return res.data
  })

const listSomeThings = async (auditcategoryId: string, unitid: any): Promise<any> =>
  await axios
    .get(`${SOME_THING_URL}/${auditcategoryId}?unittoexclude=${unitid}&items_per_page=999`)
    .then((res: AxiosResponse) => {
      return res.data
    })

const getPercentageReport = (query: any): Promise<QueryResponse> => {
  const queryRaw: any = parseRequestQuery(query)
  const year = new Date().getFullYear()
  return axios
    .get(`${GET_PER_REPORT}?year=${year}&${new URLSearchParams(queryRaw).toString()}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createThing = (thing: Model): Promise<Model | undefined> => {
  const qsd = qs.parse(window.location.search, {ignoreQueryPrefix: true}).parentUnitId ?? null
  if (qsd != null) thing.parentUnitId = parseInt(qsd?.toString())
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

const updateUnit = (thing: Model): Promise<Model | undefined> => {
  return axios
    .post(`${UPDATE_UNIT}/${thing.id}`, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteThing = (thingId: ID): Promise<void> => {
  return axios.delete(`${THING_URL}/${thingId}`).then(() => {})
}

const deleteCustomThing = (thingId: any): Promise<void> => {
  return axios.delete(`${DELETE_UNIT}/${thingId}`).then(() => {})
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
  listOtherThings,
  getPercentageReport,
  updateUnit,
  deleteCustomThing,
}
