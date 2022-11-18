import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  email?: string
  role?:string
  roleName?:string
  fullName?:string
  shift?:string
  identity?: string
  positionId?:number
  positionName?:string
  departmentName?:string
  departmentId?:number  
  collarType?:number
}

export type QueryResponse = Response<Array<Model>>


