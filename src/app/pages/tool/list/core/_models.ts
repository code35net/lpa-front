import {ID, Response} from '../../../../../_metronic/helpers'
export type Model = {
  id?: ID
  name?: string
  code?: string
  teslimVerildigiTarih?: Date
  teslimAlindigiTarih?: Date
  tamirTarihi?: Date
  İslemAdi?: string
}

export type QueryResponse = Response<Array<Model>>
