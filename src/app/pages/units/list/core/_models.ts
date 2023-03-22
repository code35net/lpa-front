import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as AuditCategory} from '../../../audit-categories/list/core/_models'
import {Model as Unit} from '../../../units/list/core/_models'
import {Model as User} from '../../../user-management/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  unitType?: number | string 
  parentUnitId?:number
  parentUnit?: Unit
  parentUnitName?: string
  auditCategoryId?: string
  auditCategory?: AuditCategory 
  shift?: number | string
  userId?: string
  userName?:string
  categoryType?:number | string
  positionId?:number
}

export type QueryResponse = Response<Array<Model>>
