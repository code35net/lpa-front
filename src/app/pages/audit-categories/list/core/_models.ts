import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  categoryType?:number | string
  
}

export type QueryResponse = Response<Array<Model>>
