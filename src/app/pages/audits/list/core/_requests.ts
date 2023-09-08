import axios, {AxiosResponse} from 'axios'
import {ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const AUDIT_URL = `${API_URL}/Audit`
const CREATE_AUDIT_URL = `${API_URL}/Custom/createAudit`
const CREATE_OP_AUDIT_URL = `${API_URL}/Custom/createOpAudit`
const GET_AUDITS_URL = `${API_URL}/Custom/getAudit`
const AUDIT_DETAILS_URL = `${API_URL}/Custom/getAuditDetail`
const AUDIT_QUESTIONS_URL = `${API_URL}/Custom/getAuditQuestions`
const FINISH_AUDIT = `${API_URL}/Custom/finishAudit`
const UNITS_URL = `${API_URL}/Custom/listUnits`
const DELETE_ALL = `${API_URL}/Custom/deleteAllAudit`
const UPDATE_AUDIT = `${API_URL}/Custom/updateAudit`
const LIST_UNIT2 = `${API_URL}/Custom/listUnit`
const DASHBOARD = `${API_URL}/Custom/getUserAuditInfo`

const listUnits = async (SectionId: any): Promise<any> =>
  await axios.get(`${UNITS_URL}?SectionId=${SectionId}`).then((res: AxiosResponse) => {
    return res.data
  })

const listUnits2 = async (ParentUnitId: any, AuditId: any): Promise<any> =>
  await axios
    .get(`${LIST_UNIT2}/${ParentUnitId}?unittoexclude=${AuditId}`)
    .then((res: AxiosResponse) => {
      return res.data
    })

const finishAudit = (auditid: any) => {
  return axios.put(`${FINISH_AUDIT}?auditid=${auditid}`).then((response: any) => response.data)
}

const getAuditDetails = async (id: string): Promise<any> =>
  await axios.get(`${AUDIT_DETAILS_URL}?Id=${id}`).then((res: AxiosResponse) => {
    return res.data
  })

const getDashboardData = async (id: any): Promise<any> =>
  await axios.get(`${DASHBOARD}?userid=${id}`).then((res: AxiosResponse) => {
    return res.data
  })

const getAuditQuestions = async (id: string): Promise<any> =>
  await axios.get(`${DASHBOARD}?UserId=${id}`).then((res: AxiosResponse) => {
    return res.data
  })

const getAudits = (query: string, onlyauditor: string): Promise<QueryResponse> => {
  const callurl =
    onlyauditor == '0' ? `${GET_AUDITS_URL}?${query}` : `${GET_AUDITS_URL}?${query}&isonlyauditor=1`

  return axios.get(callurl).then((d: AxiosResponse<QueryResponse>) => {
    const queryRaw: any = parseRequestQuery(query)

    if (queryRaw?.filter_auditcategoryid && Array.isArray(d?.data?.data)) {
      d.data.data = (d as any).data?.data?.filter(
        (item: any) =>
          parseInt(item?.auditCategoryId) === parseInt(queryRaw?.filter_auditcategoryid)
      )
    }
    // if (queryRaw?.filter_questiongroupid && Array.isArray(d?.data?.data)) {
    //   d.data.data = (d as any).data?.data?.filter(
    //     (item: any) =>
    //       parseInt(item?.questionGroupId) === parseInt(queryRaw?.filter_questiongroupid)
    //   )
    // }

    // if (queryRaw?.filter_departmentid && Array.isArray(d?.data?.data)) {
    //   d.data.data = (d as any).data?.data?.filter(
    //     (item: any) => parseInt(item?.departmentId) === parseInt(queryRaw?.filter_departmentid)
    //   )
    // }

    // if (queryRaw?.filter_sectionid && Array.isArray(d?.data?.data)) {
    //   d.data.data = (d as any).data?.data?.filter(
    //     (item: any) => parseInt(item?.sectionId) === parseInt(queryRaw?.filter_sectionid)
    //   )
    // }

    if (queryRaw?.filter_auditor && Array.isArray(d?.data?.data)) {
      // console.log(queryRaw)
      // console.log(d.data.data)
      // let x = 'Mühendis / BU Lider'
      // console.log(x.toLowerCase())
      // d.data.data = (d as any).data?.data?.filter(
      //   (item: any) => item?.auditor.toLowerCase() !== queryRaw?.filter_selectedusersname
      // )
    }

    if (queryRaw?.filter_status && Array.isArray(d?.data?.data)) {
      // console.log(queryRaw)
      // console.log(d.data.data)
      // let x = 'Mühendis / BU Lider'
      // console.log(x.toLowerCase())
      // d.data.data = (d as any).data?.data?.filter(
      //   (item: any) => item?.auditor.toLowerCase() !== queryRaw?.filter_selectedusersname
      // )
    }
    console.log(d.data)
    return d.data
  })
}

const getAuditById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${AUDIT_URL}/${id}`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createAudit = (audit: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_AUDIT_URL, audit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const createOpAudit = (audit: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_OP_AUDIT_URL, audit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAudit = (audit: Model): Promise<Model | undefined> => {
  return axios
    .post(`${AUDIT_URL}/${audit.id}`, audit)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const updateAudit2 = (auditorId: any, auditDate: any, id: any): Promise<Model | undefined> => {
  let auditorId2 = {
    auditorId,
    auditDate,
  }
  return axios
    .post(`${UPDATE_AUDIT}?id=${id}`, auditorId2)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteAudit = (auditId: ID): Promise<void> => {
  return axios.delete(`${AUDIT_URL}/${auditId}`).then(() => {})
}

const deleteAllAudit = (): Promise<void> => {
  return axios.delete(`${DELETE_ALL}`).then(() => {})
}

const deleteSelectedAudits = (auditIds: Array<ID>): Promise<void> => {
  const requests = auditIds.map((id) => axios.delete(`${AUDIT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getAuditQuestions,
  getAudits,
  deleteAudit,
  deleteSelectedAudits,
  getAuditById,
  createAudit,
  createOpAudit,
  updateAudit,
  getAuditDetails,
  finishAudit,
  listUnits,
  deleteAllAudit,
  updateAudit2,
  listUnits2,
  getDashboardData,
}
