import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  sectionId?: number
  unitType?: number
  shift?:number
}

export type QueryResponse = Response<Array<Model>>
