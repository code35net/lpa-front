import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as AuditCategory} from '../../../position/list/core/_models'
import {Model as QuestionGroup} from '../../../question-groups/list/core/_models'

export type Model = {
  id?: ID
  auditCategoryId?: number
  AuditCategory?:AuditCategory
  unitId?: number
  //Unit?:Unit
  score?: number
  questionGroupId?: number
  QuestionGroup?:QuestionGroup
  auditDate?: Date
  auditor?: string
  started?: Date
  ended?: Date
  categoryType?:number | string
  status?:number | string

}

export type QueryResponse = Response<Array<Model>>
