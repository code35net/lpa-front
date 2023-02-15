import { useMemo, useEffect, useState } from 'react'
import { useTable } from 'react-table'
import * as Yup from 'yup'
import { useIntl } from 'react-intl'
import { KTSVG, QUERIES } from '../../../_metronic/helpers'
import { useQueryResponseData, useQueryResponseLoading } from './list/core/QueryResponseProvider'
import { Columns } from './list/table/columns/_columns'
import { useQuery } from 'react-query'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import {
    listThings, getQuizQuestions, addQuizQuestionAnswer, getQuizQuestionForAnswer, addVisualQuizQuestionAnswer
} from './list/core/_requests'
import {
    getVisualUrl
} from '../question-bank/list/core/_requests'
import { Model, QuizQuestionModel } from './list/core/_models'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import moment from 'moment'
import Swal from 'sweetalert2'
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';

const QuizQuestionsForm = () => {
    const items = useQueryResponseData()
    const [markers, setMarkers] = useState<Array<Marker>>([]);
    const CustomMarker = (props: MarkerComponentProps) => {
        return (
            <span style={{ height: '25px', width: '25px', backgroundColor:'red', borderRadius:'50%',display:'inline-block'}}></span>
        )
    }
    const params = useParams()
    //console.log(params)
    const intl = useIntl()

    const [quizQuestion, setQuizQuestion] = useState <QuizQuestionModel>()
    const [activeOption, setActiveOption] = useState("")
    
    const [questionNumber, setQuestionNumber] = useState(1)
    const [timeLeft, setTimeLeft] = useState(9999)
    const [loading, setLoading] = useState(false)
    const [hasThread, setHasThread] = useState(false)
    const [imgUrl, setImgUrl] = useState("")
    const navigate = useNavigate()
    const [libraryId, setLibraryId] = useState(0)
    const [height, setHeight] = useState(200)

    useEffect(() => {
        if (params?.QuizId) {
            getQuizQuestionForAnswer(params.QuizId).then((res) => {
                if (res.quiz == undefined) {
                    navigate("/my-quiz/list")
                }
                console.log(res)
                setQuizQuestion(res)
                res.question.questionType == 3 ? setTimeLeft(25) : setTimeLeft(res.quiz.duration*60)
                if (res.question.questionType == 3) {
                    setHeight(400)
                    setLibraryId(res.question.libraryId)
                    getVisualUrl(res.question.libraryId, "original").then((res2) => {
                        setImgUrl(res2)
                    })
                }
            })
        }
        //console.log(quizQuestion)
    }, [params])

    const handleOnClickOption = (e: any) => {
        //setLoading(true)
        console.log("setted optid: ", e.currentTarget.value)
        setActiveOption(e.currentTarget.value)
        console.log(e.currentTarget.value)
        //setLoading(false)
    }

    const handleTextOption = (e: any) => {
        //setLoading(true)
        setActiveOption(e.target.value)
        console.log(e.target.value)
        //setLoading(false)
    }

    const handleDivClick = (e: any) => {
        console.log(e.clientX, e.clientY)

    }

    const handleDivMouseDown = (e: any) => {
        console.log(e.clientX, e.clientY)

        if (e.clientX > 414 && e.clientX < 437 && e.clientY > 339 && e.clientY < 362) {
            getVisualUrl(libraryId, "red").then((res2) => {
                setImgUrl(res2)
            })
        }

        if (e.clientX > 527 && e.clientX < 553 && e.clientY > 339 && e.clientY < 362) {
            getVisualUrl(libraryId, "blue").then((res2) => {
                setImgUrl(res2)
            })
        }

        if (e.clientX > 471 && e.clientX < 495 && e.clientY > 339 && e.clientY < 362) {
            getVisualUrl(libraryId, "green").then((res2) => {
                setImgUrl(res2)
            })
        }
    }

    const nextQuestion = async () => {
        setLoading(true)

        if (quizQuestion?.question.questionType != 3) {
            addQuizQuestionAnswer(quizQuestion?.id, activeOption).then(() => {
                getQuizQuestionForAnswer(params.QuizId).then((res) => {
                    if (res.quiz == undefined) {
                        navigate("/my-quiz/list")
                    }
                    console.log(res)
                    setQuizQuestion(res)
                    setActiveOption("")
                })
            })
        }
        if (quizQuestion?.question.questionType == 3) {
            console.log(markers)
            addVisualQuizQuestionAnswer(quizQuestion?.id, activeOption, parseInt(markers[0].left.toString())*5 + "," + parseInt(markers[0].top.toString())*3, hasThread).then(() => {
                getQuizQuestionForAnswer(params.QuizId).then((res) => {
                    if (res.quiz == undefined) {
                        navigate("/my-quiz/list")
                    }
                    console.log(res)
                    setQuizQuestion(res)
                    setActiveOption("")
                    setHasThread(false)
                    setActiveOption("")
                })
            })
            setTimeLeft(25)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (timeLeft < 9995 && timeLeft > 0) {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
            //console.log(timeLeft)
        }, 1000);
            return () => clearInterval(interval);
        }
        if (timeLeft <= 0) {
            console.log('finish')
        }
    }, [timeLeft]);

    return (
        <>
            <div style={{marginTop: `${height}px`}} className={`card mb-7`}>
            {/* begin::Body */}
            <div className='card-body pb-0'>
                {/* begin::Header */}
                <div className='d-flex align-items-center mb-5'>
                    {/* begin::User */}
                    <div className='d-flex align-items-center flex-grow-1'>
                        {/* begin::Avatar */}
                        <div className='symbol symbol-45px me-5'>{questionNumber}</div>
                        {/* end::Avatar */}

                        {/* begin::Info */}
                        <div className='d-flex flex-column'>
                                <span className='text-gray-800 fs-6 fw-bold'>
                                    {quizQuestion?.question.text}
                            </span>
                        </div>
                        {/* end::Info */}
                    </div>
                    {/* end::User */}
                </div>
                {/* end::Header */}
                {/* begin::Post */}
                    <>
                        <div className='mb-5'>
                            <div className='row mb-3'>

                                {/* begin::Text */}
                                {quizQuestion?.question.questionType == 0 ? quizQuestion?.question.answerTemplateOptions?.map((opt: any) => {
                                    return (

                                        <div className='col-lg-1 fv-row'>
                                            <div className='d-flex align-items-center mt-3'>
                                                <label className='form-check form-check-inline form-check-solid me-5'>
                                                    <input
                                                        className='form-check-input'
                                                        name={`qa`}
                                                        onChange={handleOnClickOption}
                                                        type='radio'
                                                        value={opt?.id}                                                                   
                                                    />
                                                    <span className='fw-bold ps-2 fs-6'>{opt?.optionName}</span>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                }) : 
                                    quizQuestion?.question.questionType == 1 && quizQuestion?.question.AnswerTemplate?.answerTemplateOptions?.map((opt: any) => {
                                        return (

                                            <div className='col-lg-1 fv-row'>
                                                <div className='d-flex align-items-center mt-3'>
                                                    <label className='form-check form-check-inline form-check-solid me-5'>
                                                        <input
                                                            className='form-check-input'
                                                            name={`qa`}
                                                            onChange={handleOnClickOption}
                                                            type='radio'
                                                            value={opt?.id}
                                                        />
                                                        <span className='fw-bold ps-2 fs-6'>{opt?.optionName}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                {
                                    quizQuestion?.question.questionType == 2 ? (
                                        <div>
                                        <label className='required fw-bold fs-6 mb-2'>
                                            {intl.formatMessage({ id: 'QUIZ.ANSWERTEXT' })}
                                        </label>

                                        <textarea
                                                rows={3}
                                                name='answertext'
                                                className={'form-control form-control-solid mb-3 mb-lg-0'}
                                                autoComplete='off'
                                                disabled={loading}
                                                value={activeOption}
                                                onChange={handleTextOption}
                                        />                                        
                                    </div>) : (<></>)
                                }
                                {
                                    quizQuestion?.question.questionType == 3 ? (
                                        <>
                                            <div style={{width: '700px'}} >
                                            <ImageMarker
                                                src={imgUrl}
                                                    markers={markers}
                                                    onAddMarker={(marker: Marker) => hasThread && quizQuestion.question.hasSign && setMarkers([marker])}
                                                    markerComponent={CustomMarker}
                                                />
                                                </div>
                                            
                                        <div className='row mb-3'>
                                            <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                                {intl.formatMessage({ id: 'QUESTION.HASTHREAD' })}
                                            </label>
                                            <div className='col-lg-8 d-flex align-items-center'>
                                                <div className='form-check form-check-solid form-switch fv-row'>
                                                    <input
                                                            checked={hasThread}
                                                            onChange={(e) => { setHasThread(e.target.checked); setMarkers([]) }}
                                                        value={hasThread ? 'on' : 'off'}
                                                        className='form-check-input w-80px mt-2 border-secondary'
                                                        type='checkbox'
                                                        id='hasThread' />
                                                        {quizQuestion.question.hasSign && (<label className='form-check-label mt-3 px-5'><small className='text-danger'>{intl.formatMessage({ id: 'QUESTION.HASTHREAD.TEXT' })}</small></label>)}
                                                </div>
                                            </div>
                                            </div>

                                            {
                                                hasThread && quizQuestion?.question.answerTemplateOptions?.map((opt: any) => {
                                                return (

                                                    <div className='col-lg-1 fv-row'>
                                                        <div className='d-flex align-items-center mt-3'>
                                                            <label className='form-check form-check-inline form-check-solid me-5'>
                                                                <input
                                                                    className='form-check-input'
                                                                    name={`qa`}
                                                                    onChange={handleOnClickOption}
                                                                    type='radio'
                                                                    value={opt?.id}
                                                                />
                                                                <span className='fw-bold ps-2 fs-6'>{opt?.optionName}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                                })
                                            }
                                        </>
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                    </>
            </div>
            {/* end::Body */}
        </div>   
            <div style={{ position: 'fixed', top: '0px', border: '1px solid', width: '100%', height: `${height}px`, background: 'white'}}>
                <span>Kalan Süre: {timeLeft}</span>

                <button
                    type="button"
                    disabled={timeLeft <= 0 || loading}
                    onClick={nextQuestion}
                >
                    Next
                </button>
                {quizQuestion?.question.questionType == 3 && (<div onClick={handleDivClick} onMouseDown={handleDivMouseDown} style={{ width: "800px", height: "330px", marginTop: "20px", backgroundImage: "url(/media/quiz/klavye.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>)}
            </div>
        </>
    )
}

export { QuizQuestionsForm }