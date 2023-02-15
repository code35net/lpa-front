import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Certificate, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Certificate`

const getThings = (query: any): Promise<QueryResponse> => {
  return axios
      .get(`${THING_URL}/getAll?modelstoinclude=Course&${query}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

export {
  getThings
}
