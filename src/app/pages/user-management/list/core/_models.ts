import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  email?: string
  role?:string
  fullname?:string
  identity?: string
  positionId?:number
  departmentId?:number  
  collarType?:number
}

export type QueryResponse = Response<Array<Model>>


