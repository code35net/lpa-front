import axios, {AxiosResponse} from 'axios'
import { ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const GET_PER_REPORT = `${API_URL}/Custom/getPercentageReportCombined`

const getReport = async (query: string): Promise<QueryResponse> => {
  const queryRaw: any = parseRequestQuery(query)
  return axios
      // .get(`${GET_PER_REPORT}?DepartmentId=2&SectionId=3&AuditCategoryId=1&QuestionCategoryId=3`)
      .get(`${GET_PER_REPORT}?${new URLSearchParams(queryRaw).toString()}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

export {
  getReport
}
