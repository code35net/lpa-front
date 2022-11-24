import axios, {AxiosResponse} from 'axios'
import {ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const AUDIT_URL = `${API_URL}/Audits`
const CREATE_AUDIT_URL = `${API_URL}/Custom/createAudit`
const GET_AUDITS_URL = `${API_URL}/Custom/getAudit`
const AUDIT_DETAILS_URL = `${API_URL}/Custom/getAuditDetail`
const AUDIT_QUESTIONS_URL = `${API_URL}/Custom/getAuditQuestions`
const FINISH_AUDIT = `${API_URL}/Custom/finishAudit`

const finishAudit = (auditid: any) => {
    return axios
        .put(`${FINISH_AUDIT}?auditid=${auditid}`).then((response: any) => response.data)
}

const getAuditDetails = async (id : string): Promise<any> => await axios.get(`${AUDIT_DETAILS_URL}?Id=${id}`).then((res : AxiosResponse) => 
 {
   return res.data;
 }
 
 );

 const getAuditQuestions = async (auditId : string): Promise<any> => await axios.get(`${AUDIT_QUESTIONS_URL}?auditId=${auditId}`).then((res : AxiosResponse) => 
 {
   return res.data;
 }
 
 );

const getAudits = (query: string): Promise<QueryResponse> => {

  return axios.get(`${GET_AUDITS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => {
    const queryRaw: any = parseRequestQuery(query)
    if (queryRaw?.filter_auditcategoryid && Array.isArray(d?.data?.data)) {
      d.data.data = (d as any).data?.data?.filter(
        (item: any) =>
          parseInt(item?.auditCategoryId) === parseInt(queryRaw?.filter_auditcategoryid)
      )
    } if (queryRaw?.filter_questiongroupid && Array.isArray(d?.data?.data)) {
      d.data.data = (d as any).data?.data?.filter(
        (item: any) =>
          parseInt(item?.questionGroupId) === parseInt(queryRaw?.filter_questiongroupid)
      )
    }

    if (queryRaw?.filter_departmentid && Array.isArray(d?.data?.data)) {
      d.data.data = (d as any).data?.data?.filter(
        (item: any) =>
          parseInt(item?.departmentId) === parseInt(queryRaw?.filter_departmentid)
      )
    }


     if (queryRaw?.filter_sectionid && Array.isArray(d?.data?.data)) {
      d.data.data = (d as any).data?.data?.filter(
        (item: any) =>
          parseInt(item?.sectionId) === parseInt(queryRaw?.filter_sectionid)
      )
    }

    return d.data
  })
}

const getAuditById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${AUDIT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const createAudit = (audit: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_AUDIT_URL, audit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAudit = (audit: Model): Promise<Model | undefined> => {
  return axios
    .post(`${AUDIT_URL}/${audit.id}`, audit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteAudit = (auditId: ID): Promise<void> => {
  return axios.delete(`${AUDIT_URL}/${auditId}`).then(() => {})
}

const deleteSelectedAudits = (auditIds: Array<ID>): Promise<void> => {
  const requests = auditIds.map((id) => axios.delete(`${AUDIT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getAuditQuestions,getAudits, deleteAudit, deleteSelectedAudits, getAuditById, createAudit, updateAudit, getAuditDetails, finishAudit}
