import axios, {AxiosResponse} from 'axios'
import {ID, parseRequestQuery, Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const QUESTION_URL = `${API_URL}/Question`
const PUT_QUESTIONS_ANSWER = `${API_URL}/Custom/answerQuestion`
const CREATE_QUESTION_URL = `${API_URL}/Custom/createBulkQuestions`
const COPY_QUESTION_URL = `${API_URL}/Custom/editQuestion`

const getQuestions = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${QUESTION_URL}/getAll?${query}&modelstoinclude=Unit,AuditCategory`)
    .then((d: AxiosResponse<QueryResponse>) => {
      const queryRaw: any = parseRequestQuery(query)
      return d.data
    })
}

const getQuestionById = (id: ID): Promise<Model | undefined> => {
  return axios.get(`${QUESTION_URL}/${id}?modelstoinclude=Section`).then((response: any) => response.data)
}

const addQuestionAnswers = (question: any) => {
  return axios
    .put(PUT_QUESTIONS_ANSWER, question, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response: any) => response.data)
}

const createBulkQuestions = (question: Model): Promise<Model | undefined> => {
  return axios
    .put(CREATE_QUESTION_URL, question)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createQuestion = (question: Model): Promise<Model | undefined> => {
  return axios
    .put(COPY_QUESTION_URL, question)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const updateQuestion = (question: Model): Promise<Model | undefined> => {
  return axios
    .put(`${COPY_QUESTION_URL}/${question.id}`, question)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteQuestion = (questionId: ID): Promise<void> => {
  return axios.delete(`${QUESTION_URL}/${questionId}`).then(() => {})
}

const deleteSelectedQuestions = (questionIds: Array<ID>): Promise<void> => {
  const requests = questionIds.map((id) => axios.delete(`${QUESTION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getQuestions,
  deleteQuestion,
  deleteSelectedQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  addQuestionAnswers,
  createBulkQuestions,
}
