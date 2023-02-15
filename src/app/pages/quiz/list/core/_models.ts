import { ID, Response } from '../../../../../_metronic/helpers'
import { Model as Course } from '../../../course/list/core/_models'
import { Model as CourseTerm } from '../../../term/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  description?: string
  rules?: string
  passMark?: number
  duration?:number
  Course?:Course
  courseId?: number
    hasCertificate?: boolean
    courseTerm?: CourseTerm
  courseTermId?: number
  
  

}

export type QuizQuestionModel = {
  quizId: number
  questionId: number
}



export type QueryResponse = Response<Array<Model>>
