import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Survey} from '../../../survey/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  description?: string
  duration?:number
  Survey?:Survey
  surveyId?: number
  isExercise?:boolean
  privateCourse?:boolean
  hasSurvey?:boolean
  hasExam?:boolean
  
  

}

export type CourseUserModel = {
  courseId: number
  userId: number
  startDay?: string
  endDay?: string
}

export type QueryResponse = Response<Array<Model>>