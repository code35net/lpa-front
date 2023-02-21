import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as AuditCategory} from '../../../position/list/core/_models'
import {Model as Unit} from '../../../units/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  unitType?: string | number
  parentUnitId?:number
  parentUnit?: Unit
  parentUnitName?: string
  auditCategoryId?: string
  shift?: number | string
}

export type QueryResponse = Response<Array<Model>>
