import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  
  
}

export type QueryResponse = Response<Array<Model>>
