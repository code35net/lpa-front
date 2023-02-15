import axios, {AxiosResponse} from 'axios'
import {ID,parseRequestQuery,  Response} from '../../../../../_metronic/helpers'
import {Model, QueryResponse, QuizQuestionModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const THING_URL = `${API_URL}/Quiz`
const ANSWEROPTIONS_URL = `${API_URL}/AnswerTemplateOption`
const QUIZQUESTION_URL = `${API_URL}/QuizQuestions`
const QUIZ_QUESTION_URL = `${API_URL}/Custom/getQuizQuestion`
const ADD_QUIZ_QUESTION_URL = `${API_URL}/Custom/addQuizQuestions`
const ADD_QUIZ_QUESTION_ANSWER_URL = `${API_URL}/Custom/addQuizQuestionAnswer`
const GET_QUIZ_QUESTION_FOR_ANSWER_URL = `${API_URL}/Custom/getQuizQuestionForAnswer`
const OTHER_QUIZ_QUESTION_URL = `${API_URL}/Custom/getOtherQuestion`

const getThings = (query: string): Promise<QueryResponse> => {
  return axios
    .get(`${THING_URL}/getAll/?${query}&modelstoinclude=CourseTerm,CourseTerm.Course`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const getQuizQuestions = (quizid: any): Promise<any> => {
    return axios
        .get(`${QUIZQUESTION_URL}/getAll/QuizId-${quizid}?modelstoinclude=Question`)
        .then((d: AxiosResponse<any>) => d.data)
}

const getQuizQuestionForAnswer = (quizid: any): Promise<any> => {
    return axios
        .get(`${GET_QUIZ_QUESTION_FOR_ANSWER_URL}?quizid=${quizid}`)
        .then((d: AxiosResponse<any>) => d.data)
}

const getAnswerTemplateOptions = (questionid: any): Promise<any> => {
    return axios
        .get(`${ANSWEROPTIONS_URL}/getAll/QuestionId-${questionid}`)
        .then((d: AxiosResponse<any>) => d.data)
}

const addQuizQuestionAnswer = (quizquestionid: any, optionid: any): Promise<QueryResponse> => {
    return axios
        .put(`${ADD_QUIZ_QUESTION_ANSWER_URL}?qqid=${quizquestionid}&optid=${optionid}`)
        .then((d: AxiosResponse<QueryResponse>) => d.data)
}
const addVisualQuizQuestionAnswer = (quizquestionid: any, optionid: any, markers: any, hasThread: any): Promise<QueryResponse> => {
    return axios
        .put(`${ADD_QUIZ_QUESTION_ANSWER_URL}?qqid=${quizquestionid}&optid=${optionid}&markers=${markers}&hasThread=${hasThread}`)
        .then((d: AxiosResponse<QueryResponse>) => d.data)
}
const getAddedThings = (Id: any): Promise<any> => {
  return axios
    .get(`${QUIZ_QUESTION_URL}?Id=${Id}`)
    .then((res: AxiosResponse) => {
      return res.data
    })
}

const getOtherThings = (Id: any): Promise<QueryResponse> => {
  return axios
    .get(`${OTHER_QUIZ_QUESTION_URL}?Id=${Id}`)
    .then((d: AxiosResponse<QueryResponse>) => d.data)
}

const listThings = async (): Promise<any> =>
  await axios.get(`${THING_URL}/getAll?page=1`).then((res: AxiosResponse) => {
    return res.data
  })

const getThingById = (id: ID): Promise<Model | undefined> => {
  return axios
    .get(`${THING_URL}/${id}?modelstoinclude=CourseTerm.Course`)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response as any)
}

const createThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .put(THING_URL, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const createQuizQuestion = (thing: QuizQuestionModel): Promise<QuizQuestionModel | undefined> => {
  return axios
    .put(QUIZQUESTION_URL, thing)
    .then((response: AxiosResponse<Response<QuizQuestionModel>>) => response.data)
    .then((response: Response<QuizQuestionModel>) => response.data)
}

const addQuizQuestions = (QuizId: number, Questions: any): Promise<any> => {
  return axios
    .put(`${ADD_QUIZ_QUESTION_URL}?QuizId=${QuizId}&Questions=${Questions}`, )
    .then((res: AxiosResponse) => {
      return res.data
    })
}

const updateThing = (thing: Model): Promise<Model | undefined> => {
  return axios
    .post(`${THING_URL}/${thing.id}`, thing)
    .then((response: AxiosResponse<Response<Model>>) => response.data)
    .then((response: Response<Model>) => response.data)
}

const deleteThing = (thingId: ID): Promise<void> => {
  return axios.delete(`${THING_URL}/${thingId}`).then(() => {})
}

const deleteSelectedThings = (thingIds: Array<ID>): Promise<void> => {
  const requests = thingIds.map((id) => axios.delete(`${THING_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const deleteSelectedQuizQuestions = (thingIds: Array<ID>): Promise<void> => {
  const requests = thingIds.map((id) => axios.delete(`${QUIZQUESTION_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {
  getThings,
  deleteThing,
  deleteSelectedThings,
  getThingById,
  getAddedThings,
  getOtherThings,
  createThing,
  updateThing,
  listThings,
    createQuizQuestion, deleteSelectedQuizQuestions, addQuizQuestions,
    getQuizQuestions, addQuizQuestionAnswer, getAnswerTemplateOptions,
    getQuizQuestionForAnswer, addVisualQuizQuestionAnswer
}
