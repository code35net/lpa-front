import {ID, Response} from '../../../../../_metronic/helpers'
import { Model as Course } from '../../../course/list/core/_models'


export type Certificate = {
  id?: ID
    name?: string
    courseId?: number
    course: Course
}

export type QueryResponse = Response<Array<Certificate>>