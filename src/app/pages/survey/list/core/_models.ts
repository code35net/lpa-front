import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  answerCount?: number
  hasComment?:boolean
}

export type QueryResponse = Response<Array<Model>>
