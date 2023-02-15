import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Survey} from '../../../survey/list/core/_models'
export type Model = {
  id?: ID
  name?: string
  Survey?:Survey
  surveyId?:number
}

export type QueryResponse = Response<Array<Model>>
