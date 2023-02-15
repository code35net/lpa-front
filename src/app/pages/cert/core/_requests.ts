import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const CERT_URL = `${API_URL}/Custom/getCertInfo`

const getCertInfo = (certid: string): Promise<Model | undefined> => {
    return axios
        .get(`${CERT_URL}/${certid}`)
        .then((response: AxiosResponse<Response<Model>>) => response.data)
        .then((response: Response<Model>) => response as any)
}

export {
    getCertInfo
}
