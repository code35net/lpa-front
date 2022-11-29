import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  fullname?: string
  positionId?:number
  positionName?:string
  departmentId?:number
  sectionId?:number
  departmentName?:string
  email?:string
  
}

export type QueryResponse = Response<Array<Model>>
