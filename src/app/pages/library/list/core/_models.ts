import {ID, Response} from '../../../../../_metronic/helpers'
import {Model as Topic} from '../../../topic/list/core/_models'
import {Model as LibraryCategory} from '../../../library-category/list/core/_models'
export type Model = {
  id?: ID
  code?: string
  original?: string
  black?: string
  blue?: string
  cyan?: string
  gray?: string
  green?: string
  orange?: string
  red?: string
  yellow?: string
  // file?: Array<File>
  topic?:Topic
  topicId?: number
  LibraryCategory?:LibraryCategory
  libraryCategoryId?: number

}

export type QueryResponse = Response<Array<Model>>
