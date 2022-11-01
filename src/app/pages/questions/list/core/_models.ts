import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  text?: string
  sectionId?: number
  departmentId?: number
  answerTemplateId?: number
  auditCategoryId?: number
  questionGroupId?: number | null
  questions?: Array<Question>
}

export type Question = {
  id: number
  text: string
  answerTemplateId: number
  questionGroupId: number | null 
  isAddedQuestionCategory?: boolean
}

export type QueryResponse = Response<Array<Model>>
