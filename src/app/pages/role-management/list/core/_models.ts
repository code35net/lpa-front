import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?:string
  modelName?: string
}

export type QueryResponse = Response<Array<Model>>
