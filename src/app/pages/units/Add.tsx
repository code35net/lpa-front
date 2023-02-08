import React, {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model, Unit} from './list/core/_models'
import {Model as Section} from '../sections/list/core/_models'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {KTSVG} from '../../../_metronic/helpers'
import {useIntl} from 'react-intl'

import {listDepartments} from '../departments/list/core/_requests'
import {listSections} from '../sections/list/core/_requests'
import {listUsers} from '../user-management/list/core/_requests'
import qs from 'qs'

import {useQueryResponse} from '../questions/list/core/QueryResponseProvider'
import {useListView} from '../questions/list/core/ListViewProvider'
import {createBulkUnits} from '../subunits/list/core/_requests'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'


import {useNavigate} from 'react-router-dom'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}
// const editchema = Yup.object().shape({
//   text: Yup.string()
//     .max(50, 'Maximum 50 symbols')
//     .required('Question required'),
// })


const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
    
  },
 
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]


const UnitForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const [departments, setDepartments] = React.useState([])
  const [sections, setSections] = React.useState([])
  const [unitgroups, setUnitGroups] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [questioncategories, setQuestionCategories] = React.useState([])
  const [answertemplates, setAnswertemplates] = React.useState([])
  const [hasShiftException, setShiftException] = React.useState<boolean>()


  const [units, setUnits] = React.useState<Array<Unit>>([])

  useEffect(() => {
    listDepartments().then((res) => {
      if (res?.data?.length) {
        setDepartments(res.data || [])

        // listSections(res?.data[0]?.id).then((res3) => {
        //   setSections(res3.data || [])
        // })
      }
    })
    

    listUsers().then((res2) => {
      setUsers(res2.data || [])
    })
   
    

    setUnits([
      {
        id: 1,
        name: '',
        leaderUserId: '',
        // questionGroupId: Array.isArray(res2.data) && res2.data.length ? res2.data[0]?.id : null,
        //isAddedQuestionCategory: true,
      },
    ] as any)
  }, [])

  const [formForEdit] = useState<Model>({
    ...item,
    unitType:undefined,
    leaderUserId: undefined,
    shiftException:undefined,
    units: [],
  } as Model)

  //   const updateData = (fieldsToUpdate: Partial<Model>): void => {
  //     const updatedData = Object.assign(data, fieldsToUpdate)
  //     setData(updatedData)
  //   }

  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId

  

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: formForEdit,
    // validationSchema: editchema,
    onSubmit: async (values) => {
      setLoading(true)



      values.sectionId = parseInt(qsd?.toString() || "0")

      
      

      
      if (!values.leaderUserId && users.length) {
        values.leaderUserId = (users[0] as any)?.id
      }



      
      if (!units[units.length - 1].name && units.length > 1) {
        units.pop()
      }
      values.units = units


      values.units = values?.units?.map((item:Unit)=>{

        // if(!item.isAddedQuestionCategory)
        // {
        //   item.questionGroupId = null;
        // }
        return item;
      })

      if(values.unitType != 1)
{
  setShiftException(false)
}

if(!hasShiftException)
{
  values.shiftException = undefined
}
else
{
  
  values.shiftException = parseInt(values.shiftException?.toString() || "0", 10)
}

      
      try {
        await createBulkUnits(values)
      } catch (error) {
        console.log(error)
      }
     

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  const handleChangeDepartmentId = async (event: any) => {
    formik.setFieldValue('departmentId', event.target.value)
    if(event.target.value != '')
    {
    listSections(event.target.value).then((res) => {
      setSections(res.data)
    })
  }
    else
    {
      setSections([])
    }
  
  }


  
  const handleUnitText = (id: number, name: string) => {
    let index = units.findIndex((unit) => unit.id === id)
    if (index > -1) {
      units[index].name = name
    }
    setUnits([...units])
  }

  
  
  
  const addQuestionItem = () => {
    if (units[units.length - 1].name) {
      units.push({
        id: units[units.length - 1].id + 1,
        name: '',
        //answerTemplateId: (answertemplates as any)[0]?.id as number,
        //questionGroupId: (questioncategories as any)[0]?.id as number,
        //isAddedQuestionCategory: true,
      })
      setUnits([...units])
    }
  }

  const deleteQuestionItem = () => {
    if (units.length > 1) {
      units.pop()
      setUnits([...units])
    }
  }

  return (
    
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'UNIT.ADDPAGE.TITLE'})}</h3>
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
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
              {intl.formatMessage({id: 'UNIT.LIST.TYPE'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                  <label className='form-check form-check-inline form-check-solid me-5'>
                    <input
                      className='form-check-input'
                      name='unitType'
                      type='radio'
                      value={0}
                      checked={formik.values.unitType === 0}
                      onChange={() => formik.setFieldValue("unitType",0)}
                    />
                    <span className='fw-bold ps-2 fs-6'>
                    {intl.formatMessage({id: 'UNIT.LIST.LINE'})}
                    </span>
                  </label>

                  <label className='form-check form-check-inline form-check-solid'>
                  <input
                      className='form-check-input'
                      name='unitType'
                      type='radio'
                      value={1}
                      checked={formik.values.unitType === 1}
                      onChange={() => formik.setFieldValue("unitType",1)}
                    />
                    <span className='fw-bold ps-2 fs-6'>
                    {intl.formatMessage({id: 'UNIT.LIST.OPERATOR'})}
                    </span>
                  </label>
                 
                </div>
              </div>
            </div>
            

            { formik.values.unitType == 1 && (
<div className='fv-row mb-7'>
                            <label className='required fw-bold fs-6 mb-2'>
                              {intl.formatMessage({id: 'UNIT.ADDPAGE.LEADER'})}
                            </label>
                           
                            <select
                  className='form-select form-select-solid form-select-md'
                  {...formik.getFieldProps('leaderUserId')}
                  value={formik.values.leaderUserId}
                  onChange={(e) => {
                    formik.setFieldValue('leaderUserId', e.target.value)
                  }}
                >
                  <option value=''>Seçiniz</option>
                  {users.map((user: any) => (
                    <option value={user?.id as any} key={user?.id as any}>
                      {user?.fullName as any}
                    </option>
                  ))}
                </select>
                          </div>
            )}
                      { formik.values.unitType == 1 && (
                      <div className='fv-row mb-7'>
                          
                          <div className='form-check form-check-solid form-switch'>
                          <label className='fw-bold mt-3'>
                            
                            {intl.formatMessage({
                              id: 'UNIT.HASSHIFTEXCEPTION',
                            })}
                          </label>

                   
                   


                              <input
                                checked={hasShiftException}
                                onChange={(e)=> setShiftException(e.target.checked)}
                                value={hasShiftException ? 'on' : 'off'}
                                className='form-check-input w-30 mt-2'
                                type='checkbox'
                                id='allowmarketing'
                              />
                              <label className='form-check-label'></label>
                            </div>
                            {(hasShiftException && 
                            <select
                            className='form-select form-select-solid form-select-md'
                            {...formik.getFieldProps('shiftException')}
                            value={formik.values.shiftException}
                          >
                             <option value='0'>07:30 - 15:30</option>
                            <option value='1'>15:30 - 23:30</option>
                            <option value='2'>23:30 - 07:30</option>                  
                          </select>
                            )}
                        </div>
 )}

            

            <div className='separator separator-dashed my-6'></div>
            <div className='row mb-6'>
              {units.map((question: Unit) => {
                return (
                  <>
                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                      {question.id}.{' '}
                      {intl.formatMessage({id: 'UNIT.LIST.NAME'})}
                    </label>

                    <div className='col-lg-12'>
                      <div className='row'>
                        <div className='col-md-12 fv-row'>
                          <input
                            key={`${question.id}`}
                            name={`${question.id}`}
                            id={`${question.id}`}
                            onChange={(e) => {
                              handleUnitText(question.id, e.target.value)
                            }}
                            type='text'
                            className='form-control form-control-solid mb-3'
                            placeholder='Unit name'
                            value={question.name}
                          />
                        </div>
                        </div>
                        <div className='row'>
                        


                        <div className='col-md-1 fv-row'>
                          <a
                            type='button'
                            onClick={deleteQuestionItem}
                            className='btn btn-sm btn-danger btn-active-light-danger'
                          >
                            <KTSVG path='/media/icons/duotune/arrows/arr010.svg' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            <div className='row mb-6'>
              <div className='mb-2 col-lg-4 fv-row'>
                <a
                  type='button'
                  onClick={addQuestionItem}
                  className='btn btn-sm btn-secondary btn-active-light-primary'
                >
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' />{' '}
                  {intl.formatMessage({id: 'UNIT.ADDPAGE.ADDBUTTON'})}
                </a>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              onClick={() => {
                formik.submitForm().then(() => {
                  navigate(`/units/list?sectionId=${qsd}`)
                })
              }}
              className='btn btn-sm btn-dark'
              disabled={loading}
            >
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'MODALFORM.WAIT'})}{' '}
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

export {UnitForm}
