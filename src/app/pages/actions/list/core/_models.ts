import {ID, Response} from '../../../../../_metronic/helpers'
import { uuid } from 'uuidv4';

export type Model = {
  id?: ID
  auditname?:string
  departmantName?:string
  sectionName?:string
  unitName?:string
  assignedUser?:string
  questiontext?:string
  auditDate?:string
  finding?:string
  actionCode?:string
}

export type QueryResponse = Response<Array<Model>>
