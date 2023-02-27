import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Section} from '../../../units/list/core/_models'
import {Model as Department} from '../../../units/list/core/_models'
import {Model as AnswerTemplate} from '../../../answertemplates/list/core/_models'
import {Model as ac} from '../../../audit-categories/list/core/_models'
import {Model as QuestionCategory} from '../../../question-groups/list/core/_models'

export type Model = {

  name?: string
  avarage?: number
 
}


export type QueryResponse = Response<Array<Model>>
