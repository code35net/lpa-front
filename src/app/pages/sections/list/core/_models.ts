import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Department} from '../../../departments/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  departmentId: number
  departmentName?: string
  
}

export type QueryResponse = Response<Array<Model>>
