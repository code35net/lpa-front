import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Unit} from '../../../units/list/core/_models'
import {Model as AnswerTemplate} from '../../../answertemplates/list/core/_models'
import {Model as ac} from '../../../audit-categories/list/core/_models'
import {Model as QuestionCategory} from '../../../question-groups/list/core/_models'

export type Model = {
  id?: ID
  text?: string

  isNew?: boolean
  AnswerTemplate?: AnswerTemplate
  answerTemplateId?: number
  auditCategory?: ac
  auditCategoryId?: number
  QuestionCategory?: QuestionCategory
  questionGroupId?: number | null
  questions?: Array<Question>
  isAddedQuestionCategory?: boolean
  unitId?: number
  unitName?: string
  auditCategoryName?: string
}

export type Question = {
  id: number
  text: string
  answerTemplateId: number
  questionGroupId: number | null
  isAddedQuestionCategory: boolean
  Unit?: Unit
  unitId?: number
  isAuthorized?: boolean
  questionUsers?: Array<string>
}

export type QueryResponse = Response<Array<Model>>
