import { number } from 'yup'
import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  email?: string
  role?:string
  roleName?:string
  fullName?:string
  identity?: string
  positionId?:number
  positionName?:string
  auditCategoryId?:number
  auditCategoryName?:string

  
  // unitName?:string
  // unitId?:string  
  isDeleteUser?:boolean
  userId?: string
  // parentUnitId?: number
  // punitId? : number
}

export type QueryResponse = Response<Array<Model>>


