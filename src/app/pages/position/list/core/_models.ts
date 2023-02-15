import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as AuditCategory} from '../../../position/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  auditCategoryId?: number
  AuditCategory?:AuditCategory
}

export type QueryResponse = Response<Array<Model>>
