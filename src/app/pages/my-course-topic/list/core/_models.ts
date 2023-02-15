import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Course} from '../../../course/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  Course?:Course
  courseId?: number

}

export type QueryResponse = Response<Array<Model>>
