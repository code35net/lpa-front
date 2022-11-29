import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  sectionId?: number
  leaderUserId?: number
  parentUnitId?: number
  unitType?: number
  shift?:number
  hasGroup? : boolean
  unitgroupcheck? : boolean
}

export type QueryResponse = Response<Array<Model>>
