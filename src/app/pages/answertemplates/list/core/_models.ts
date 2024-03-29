import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  text?:string
  //answerText?: string
  templateoptions?: Array<TemplateOptions>
}

export type TemplateOptions = {
  id: number
  optionname: string
  needAction: boolean
  isTrue: boolean
}

export type QueryResponse = Response<Array<Model>>

