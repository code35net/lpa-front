import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Audit} from '../../../audits/list/core/_models'
import {Model as Unit} from '../../../units/list/core/_models'
import {Model as User} from '../../../user-management/list/core/_models'
export type Model = {
  id?: ID
  text?: string 
  unitId?:number
  unit?: Unit
  auditId?: number
  audit?: Audit
  isAccepted?: boolean

}

export type QueryResponse = Response<Array<Model>>
