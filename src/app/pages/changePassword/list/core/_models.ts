import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  email?: string
  oldPassword?: string
  password?: string
}

export type QueryResponse = Response<Array<Model>>
