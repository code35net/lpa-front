import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  departmentId?: number
  sectionId?: number
  unitId?:number
  leaderUserId?: string
  parentUnitId?: number
  unitType?: number
  shift?:number
  shiftException?:number
  //isSetter?:number
  leaderName?:string
  hasGroup? : boolean
  unitgroupcheck? : boolean
  units?: Array<Unit>
}

export type Unit = {
  id: number
  name: string
  
}

export type QueryResponse = Response<Array<Model>>
