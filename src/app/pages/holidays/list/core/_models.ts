import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  whatDay?: string
  theDay?: string

}

export type QueryResponse = Response<Array<Model>>
