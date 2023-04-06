import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'

import {listSomeThings as listPartialUnits} from '../units/list/core/_requests'
import {listThings as listAuditCategories} from '../audit-categories/list/core/_requests'
import {listThings as listPositions} from '../position/list/core/_requests'
import {listThings as listQuestionCategories} from '../question-groups/list/core/_requests'
import {listUsers} from '../user-management/list/core/_requests'
import {useQueryResponse} from './list/core/QueryResponseProvider'
import {useListView} from './list/core/ListViewProvider'
import {createAudit} from './list/core/_requests'
import {useNavigate} from 'react-router-dom'
import {listSomeThings as listUnits} from '../units/list/core/_requests'
import {listOtherThings} from '../units/list/core/_requests'
import clsx from 'clsx'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}

const EditAuditForm2: FC<Props> = ({item}) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
  const [units, setUnits] = React.useState([])
  const [gunits, setgUnits] = React.useState([])
  const [positions, setPositions] = React.useState([])
  const [auditcategories, setAuditCategories] = React.useState([])
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [rawUsers, setRawUsers] = React.useState([])
  const [parentUnits, setParentUnits] = React.useState<any>([])
  const [isOperator, setIsOperator] = React.useState(true)
  const [operators, setOperators] = React.useState<any>([])
  const [unitValue, setUnitValue] = React.useState<any>([])

  const [questions, setQuestions] = React.useState<Array<Model>>([])

  useEffect(() => {
    listAuditCategories().then((res2) => {
      setAuditCategories(res2.data || [])
    })
    listQuestionCategories().then((res5) => {
      setQuestionCategories(res5.data || [])
    })
    listPositions().then((res6) => {
      setPositions(res6.data || [])
    })

    listUsers().then((res7) => {
      setUsers(res7.data || [])
      setRawUsers(res7.data || [])
    })

    setQuestions([
      {
        id: 1,
        text: '',
      },
    ] as any)
  }, [])

  const [formForEdit] = useState<Model>({
    ...item,
    auditCategoryId: undefined,
    departmentId: undefined,
    sectionId: undefined,
    unitType: undefined,
    unitId: undefined,
    gunitId: undefined,
    categoryType: undefined,
    questionGroupId: undefined,
    positionId: undefined,
    year: undefined,
    month: undefined,
    fullname: undefined,
    userId: undefined,
    isAddedQuestionCategory: true,
    nonPeriodicDate: undefined,
  } as Model)

  //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
  //     const updatedData = Object.assign(data, fieldsToUpdate)
  //     setData(updatedData)
  //   }

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,

    onSubmit: async (values) => {
      setLoading(true)

      // if (!values.categoryType) {
      //   values.categoryType = 0
      // }
      // values.categoryType = parseInt(values.categoryType.toString())

      if (!values.unitId && units.length) {
        values.unitId = (units[0] as any)?.id
      }

      if (!values.year) {
        values.year = 2022
      }

      if (!values.positionId && positions.length) {
        values.positionId = (positions[0] as any)?.id
      }

      if (!values.auditCategoryId && auditcategories.length) {
        values.auditCategoryId = (auditcategories[0] as any)?.id
      }

      if (!values.questionGroupId && questioncategories.length) {
        values.questionGroupId = (questioncategories[0] as any)?.id
      }

      if (!values.userId && users.length) {
        values.userId = (users[0] as any)?.id
      }

      // if(parseInt(values.categoryType as unknown as string) === 4 && values.nonPeriodicDate)
      // {
      //   values.nonPeriodicDate = new Date(values.nonPeriodicDate).toISOString();
      // }
      // else{
      //   values.nonPeriodicDate = null
      // }

      try {
        await createAudit(values)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  const handleUsers = (value: string, type: string) => {
    let filteredData = [...rawUsers]

    if (type === 'positionId' && value !== '' && value !== undefined && value !== null) {
      filteredData = filteredData.filter(
        (item: any) => parseInt(item?.positionId) === parseInt(value)
      )
    }

    setUsers([...filteredData])
  }

  const handleAuditCategoryId = async (event: any) => {
    formik.setFieldValue('auditCategoryId', event.target.value)
    if (event.target.value != '') {
      listPartialUnits(event.target.value, 0).then((res3) => {
        setUnits(res3.data)
      })
    }

    if (event.target.value != '') {
      listPartialUnits(event.target.value, 0).then((res3) => {
        setUnits(res3.data)
      })
    }

    // if(event.target.value != '')
    // {
    //   listPositions(event.target.value).then((res3) => {
    //     setPositions(res3.data)
    //   })
    // }
  }
  const hadleFindOperator = async (event: any) => {
    // formik.setFieldValue('auditCategoryId', event.target.value),
    console.log(event.target.value)
    setUnitValue(event.target.value)
    if (event.target.value != '') {
      listOtherThings(parseInt(event.target.value)).then((response) => {
        setOperators(response.data)
      })
    }
  }
  console.log(operators)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'AUDITS.PLANNER.TITLE'})}</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e)
          }}
          noValidate
          className='form'
        >
          <div className='card-body border-top p-9'>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'ADD.QUESTION.AUDITCATEGORY'})}
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  onChange={(e) => handleAuditCategoryId(e)}
                >
                  <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  {auditcategories.map((auditcategory: any) => (
                    <option value={auditcategory?.id as any} key={auditcategory?.id as any}>
                      {auditcategory?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>{intl.formatMessage({id: 'AUDITS.PLANNER.UNIT'})}</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('unitId')}
                  value={unitValue}
                  onChange={(e) => {
                    hadleFindOperator(e)
                    formik.handleChange(e)
                  }}
                  disabled={units.length === 0}
                >
                  {units.length && (
                    <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  )}
                  {units.map((unit: any) => (
                    <option value={unit?.id} key={unit?.id as any}>
                      {unit?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {' '}
                {intl.formatMessage({id: 'OPERATOR_IsCHOOSE'})}
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    // {...formik.getFieldProps('isAddedQuestionCategory')}
                    checked={isOperator}
                    onChange={() => setIsOperator(!isOperator)}
                    // value={isOperator}
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    id='allowmarketing'
                  />
                  <label className='form-check-label mt-1 px-5'>
                    {' '}
                    <small className='text-danger'>
                      {intl.formatMessage({id: 'DROPDOWN_SELECT'})}{' '}
                    </small>{' '}
                  </label>
                </div>
              </div>
            </div>
            {isOperator && (
              <div className='row mb-3'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'> {intl.formatMessage({id: 'OPERATOR_CHOOSE'})}</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <select
                    className='form-select form-select-solid form-select-md'
                    {...formik.getFieldProps('unitId')}
                    value={formik.values.unitId}
                    onChange={formik.handleChange}
                    disabled={operators.length === 0}
                  >
                    {operators.length && (
                      <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                    )}
                    {operators.map((unit: any) => (
                      <option value={unit?.id} key={unit?.id as any}>
                        {unit?.name as any}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {intl.formatMessage({id: 'ADD.QUESTION.IS_ADDED_QUESTION_CATEGORY'})}
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <div className='form-check form-check-solid form-switch fv-row'>
                  <input
                    {...formik.getFieldProps('isAddedQuestionCategory')}
                    checked={formik.values.isAddedQuestionCategory}
                    onChange={formik.handleChange}
                    value={String(formik.values.isAddedQuestionCategory)}
                    className='form-check-input w-45px h-30px'
                    type='checkbox'
                    id='allowmarketing'
                  />
                  <label className='form-check-label mt-1 px-5'>
                    {' '}
                    <small className='text-danger'>
                      {intl.formatMessage({id: 'AUDITS.PLANNER.CLOSE.SELECT'})}
                    </small>{' '}
                  </label>
                </div>
              </div>
            </div>
            {formik.values.isAddedQuestionCategory && (
              <div className='row mb-3'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  {intl.formatMessage({id: 'ADD.QUESTION.CATEGORY'})}
                </label>
                <div className='col-lg-8 fv-row'>
                  <select
                    className='form-select form-select-solid form-select-md'
                    {...formik.getFieldProps('name')}
                  >
                    <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                    {questioncategories.map((questioncategory: any) => (
                      <option key={questioncategory?.id as any}>
                        {questioncategory?.name as any}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'AUDITS.PLANNER.POSITION'})}</label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('positionId')}
                  value={formik.values.positionId}
                  onChange={(e) => {
                    formik.setFieldValue('positionId', e.target.value)
                    handleUsers(e.target.value, 'positionId')
                  }}
                >
                  <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  {positions.map((position: any) => (
                    <option value={position?.id as any} key={position?.id as any}>
                      {position?.name as any}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'AUDITS.LIST.AUDITOR'})}
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('userId')}
                  value={formik.values.userId}
                  onChange={formik.handleChange}
                >
                  <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  {users.map((user: any) => (
                    <option value={user?.id as any} key={user?.id as any}>
                      {user?.fullName as any}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {intl.formatMessage({id: 'AUDITS.PLANNER.YEAR'})}
              </label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('year')}
                >
                  <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  <option value='2022'>2022</option>
                  <option value='2023'>2023</option>
                  <option value='2024'>2024</option>
                  <option value='2025'>2025</option>
                </select>
              </div>
            </div>

            {
              //    parseInt(formik.values.categoryType as string) === 5 &&
              <div className='row mb-3'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage({id: 'AUDITS.PLANNER.OPTIONS.INSTANT.DATE'})}
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    //placeholder='Full name'
                    {...formik.getFieldProps('nonPeriodicDate')}
                    type='datetime-local'
                    name='nonPeriodicDate'
                    className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0 ',
                      {
                        'is-invalid':
                          formik.touched.nonPeriodicDate && formik.errors.nonPeriodicDate,
                      },
                      {
                        'is-valid':
                          formik.touched.nonPeriodicDate && !formik.errors.nonPeriodicDate,
                      }
                    )}
                    autoComplete='off'
                    disabled={formik.isSubmitting}
                  />
                </div>
                {formik.touched.nonPeriodicDate && formik.errors.nonPeriodicDate && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.nonPeriodicDate}</span>
                    </div>
                  </div>
                )}
              </div>
            }

            {/* <div className='row mb-3'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>{intl.formatMessage({id: 'AUDITS.PLANNER.MONTH'})}</label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('month')}
                >
                  <option value=''>{intl.formatMessage({id: 'AUDITS.PLANNER.CHOOSE'})}</option>
                  <option value='01'>{intl.formatMessage({id: 'AUDITS.MOUNTH.01'})}</option>
                  <option value='02'>{intl.formatMessage({id: 'AUDITS.MOUNTH.02'})}</option>
                  <option value='03'>{intl.formatMessage({id: 'AUDITS.MOUNTH.03'})}</option>
                  <option value='04'>{intl.formatMessage({id: 'AUDITS.MOUNTH.04'})}</option>
                  <option value='05'>{intl.formatMessage({id: 'AUDITS.MOUNTH.05'})}</option>
                  <option value='06'>{intl.formatMessage({id: 'AUDITS.MOUNTH.06'})}</option>
                  <option value='07'>{intl.formatMessage({id: 'AUDITS.MOUNTH.07'})}</option>
                  <option value='08'>{intl.formatMessage({id: 'AUDITS.MOUNTH.08'})}</option>
                  <option value='09'>{intl.formatMessage({id: 'AUDITS.MOUNTH.09'})}</option>
                  <option value='10'>{intl.formatMessage({id: 'AUDITS.MOUNTH.10'})}</option>
                  <option value='11'>{intl.formatMessage({id: 'AUDITS.MOUNTH.11'})}</option>
                  <option value='12'>{intl.formatMessage({id: 'AUDITS.MOUNTH.12'})}</option>
                </select>
              </div>
            </div> */}
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              onClick={() => {
                formik.submitForm().then(() => {
                  // navigate('/audits/list')
                })
              }}
              className='btn btn-sm btn-dark'
              disabled={loading}
            >
              {!loading && `${intl.formatMessage({id: 'AUDITS.PLANNER.SAVE'})}`}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'MODALFORM.WAIT'})}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {EditAuditForm2}
