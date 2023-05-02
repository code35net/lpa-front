import {ID, Response} from '../../../../../_metronic/helpers'
import {uuid} from 'uuidv4'

export type Model = {
  id?: ID
  auditname?: string
  departmantName?: string
  sectionName?: string
  unitName?: string
  assignedUserName?: string
  questiontext?: string
  auditDate?: string
  lastDate?: string
  finding?: string
  done?: boolean
  status?: number
  actionCode?: string
  text?: string
  file?: string
  filePath?: string
  answerId?: number
  endDate?: any
  auditorName?: string
  unitId?: number
  definition?: string
  note?: string
}
export type QueryResponse = Response<Array<Model>>
