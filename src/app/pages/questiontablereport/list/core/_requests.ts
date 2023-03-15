import axios, {AxiosResponse} from 'axios'
import { ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const GET_PER_REPORT = `${API_URL}/Custom/getQuestionReport`

const getReport = async (query: string): Promise<QueryResponse> => {
  const queryRaw: any = parseRequestQuery(query)
  let qr = new URLSearchParams(queryRaw).toString()
  .replace("filter_departmentid", "DepartmentId")
  .replace("filter_questiongroupid","QuestionGroupId")
  .replace("filter_year","Year")
  .replace("filter_month","Month")
  .replace("filter_sectionid","SectionId")
  .replace("filter_unitid","UnitId")
  
  return axios
      // .get(`${GET_PER_REPORT}?DepartmentId=2&SectionId=3&AuditCategoryId=1&QuestionCategoryId=3`)
      .get(`${GET_PER_REPORT}?${qr}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

export {
  getReport
}
