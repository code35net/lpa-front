import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as SurveyGroup} from '../../../survey-group/list/core/_models'
export type Model = {
  id?: ID
  text?: string
  SurveyGroup?:SurveyGroup
  surveyGroupId?:number
}

export type QueryResponse = Response<Array<Model>>
