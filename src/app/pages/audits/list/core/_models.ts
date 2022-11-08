import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  sectionId?: number
  departmentId?: number
  positionId?:number
  unitId?: number
  year?: number
  auditCategoryId?: number
  questionGroupId?: number | null
  isAddedQuestionCategory?: boolean
  auditName?: string
  auditId?:number
  auditDate?: string
  auditor?:string
  type?: string
  userId?:string
  fullname?:string
  categoryType?:number | string
  collarType?:number
  status?: string
  questionCount?: number
  nonPeriodicDate?:string | null
}



export type QueryResponse = Response<Array<Model>>
