import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Course} from '../../../course/list/core/_models'
import {Model as Topic} from '../../../topic/list/core/_models'
import {Model as AnswerTemplate} from '../../../answertemplate/list/core/_models'
export type Model = {
  id?: ID
  text?: string
  questionType?: number
  duration?:number
  topic?:Topic
  topicId?: number
  coordinat?: string
  hasSign?: boolean
  hasThread?: boolean
  AnswerTemplate?:AnswerTemplate
  answerTemplateId?:number
  isConstantOption?:boolean
    isTextQuestion?: boolean
    isVisualQuestion?: boolean
  libraryId?: number
    questionoptions?: Array<QuestionOptions>
    answerTemplateOptions?: Array<QuestionOptions>
}

export type QuestionOptions = {
  id: number
  optionName: string
  isTrue: boolean
}

export type QueryResponse = Response<Array<Model>>

export type QueryResponse2 = Response<Array<QuestionOptions>>
