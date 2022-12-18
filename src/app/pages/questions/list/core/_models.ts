import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Section} from '../../../sections/list/core/_models'
import {Model as Department} from '../../../departments/list/core/_models'
import {Model as Unit} from '../../../units/list/core/_models'
import {Model as AnswerTemplate} from '../../../answertemplates/list/core/_models'
import {Model as ac} from '../../../auditcategories/list/core/_models'
import {Model as QuestionCategory} from '../../../questioncategories/list/core/_models'

export type Model = {
  id?: ID
  text?: string
  section?:Section
  sectionId?: number
  Department?:Department
  departmentId?: number
  Unit?:Unit
  unitId?: number
  isNew?:boolean
  AnswerTemplate?:AnswerTemplate
  answerTemplateId?: number
  auditCategory?: ac
  auditCategoryId?: number
  QuestionCategory?:QuestionCategory
  questionGroupId?: number | null
  questions?: Array<Question>
  isAddedQuestionCategory? : boolean
 
}

// type AuditCategory = {
//   id: number
//   name: string
// }

export type Question = {
  id: number
  text: string
  answerTemplateId: number
  questionGroupId: number | null 
  isAddedQuestionCategory: boolean
}

export type QueryResponse = Response<Array<Model>>
