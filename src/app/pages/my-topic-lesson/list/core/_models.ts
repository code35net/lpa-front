import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Topic} from '../../../topic/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  file?: string
  // fileType?: string
  Topic?:Topic
  topicId?: number

}

export type QueryResponse = Response<Array<Model>>
