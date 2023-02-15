import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  termName?: string
  startDay?: Date
  endDay?: Date
  Course?: Course
  courseId?: number
}

export type Course = {
  id?: ID
  name?: string
}

export type TermUser = {
    id?: ID
    userId: string
    courseTermId: number
}

export type QueryResponse = Response<Array<Model>>