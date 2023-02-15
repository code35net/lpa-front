import {ID, Response} from '../../../../_metronic/helpers'
export type Model = {
    name?: string
    duration?: string
    validuntil?: string
    date?: string
    coursename?: string
    identity?: string
}

export type QueryResponse = Response<Array<Model>>