import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  whatDay?: string
  theDay?: Date
}

export type QueryResponse = Response<Array<Model>>
