import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Section} from '../../../sections/list/core/_models'
import {Model as Department} from '../../../departments/list/core/_models'
import {Model as AnswerTemplate} from '../../../answertemplates/list/core/_models'
import {Model as ac} from '../../../auditcategories/list/core/_models'
import {Model as QuestionCategory} from '../../../questioncategories/list/core/_models'

export type Model = {

  name?: string
  avarage?: number
 
}


export type QueryResponse = Response<Array<Model>>
