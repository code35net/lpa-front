
import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createUnit, updateUnit, listUnits, getUnitsForDropdown} from '../core/_requests'
import {getUsers, listUsers} from '../../../user-management/list/core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {Field} from 'formik'
import {KTSVG} from '../../../../../_metronic/helpers'
import qs from 'qs'

type Props = {
  isUnitLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Unit required'),
})

const EditModalForm: FC<Props> = ({item, isUnitLoading}) => {
  console.log(item,"test")
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [unitgroups, setUnitGroups] = React.useState([])
  const [leaderusers, setLeaderUsers] = React.useState([])

  const [unitgroupisactive, setunitgroupisactive] = React.useState<boolean>()
  const [hasShiftException, setShiftException] = React.useState<boolean>()
  //const [isTheSetter, setSetter] = React.useState<boolean>()

  const [unitgroupshow, setunitgroupshow] = React.useState<boolean>()
  const [unitgroupshowall, setunitgroupshowall] = React.useState<boolean>()
  const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId

  const [unitForEdit] = useState<Model>({
    name: undefined,
    unitType: undefined,
    shift:undefined,
    leaderUserId:undefined,
    parentUnitId:0,
    unitgroupcheck: undefined,
    shiftException:undefined,
    //isSetter:undefined,
    ...item,
   
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {
    
    listUnits(qsd?.toString() || "0").then((res)=>{
      setunitgroupshow(res.data.some((a:any) => a.unitType == 2))
      setunitgroupshowall(res.data.length == 0)
    })


    getUnitsForDropdown().then((res2) => {


      setUnitGroups(res2.data.filter((a: any) => a.unitType == 2) || [])
      if(item.parentUnitId)
      {
        setunitgroupisactive(true)
      }
      
    })
    
    listUsers().then((res) => {
      setLeaderUsers(res.data || [])
    })
    
  }, [])

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    
    initialValues: unitForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
     
        if(values.unitType == 2)
        {
          values.leaderUserId = undefined
        }
        values.parentUnitId = parseInt(values.parentUnitId?.toString() || "0", 10)
      if(!unitgroupisactive)
      {
        values.parentUnitId = undefined
      }
      
if(values.unitType != 1)
{
  setShiftException(false)
}

// if(values.unitType != 1)
// {
//   setSetter(false)
// }

if(!hasShiftException)
{
  values.shiftException = undefined
}
else
{
  
  values.shiftException = parseInt(values.shiftException?.toString() || "0", 10)
}
// if(!isTheSetter)
// {
//   values.isSetter = undefined
// }
// else
// {
  
//   values.isSetter = parseInt(values.isSetter?.toString() || "0", 10)
// }

      try {
        if (isNotEmpty(values.id)) {
          await updateUnit(values)
        } else {
          await createUnit(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  const handleUnitGroup = (value: boolean) => {

    setunitgroupisactive(value)
  }

  return (
    <>
      <form id='kt_modal_add_item_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_item_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_item_header'
          data-kt-scroll-wrappers='#kt_modal_add_item_scroll'
          data-kt-scroll-offset='300px'
        >
         
        </div>

<div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
              {intl.formatMessage({id: 'UNIT.LIST.TYPE'})}
              </label>

              <div className='col-lg-8 fv-row'>
                <div className='d-flex align-items-center mt-3'>
                {
                      (!unitgroupshow || unitgroupshowall) && (
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

)}
{
                      (!unitgroupshow || unitgroupshowall)  && (
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

                      )}

                    {
                      (unitgroupshow || unitgroupshowall) && (
                    <label className='form-check form-check-inline form-check-solid'>
                                      <input
                                          className='form-check-input'
                                          name='unitType'
                                          type='radio'
                                          value={2}
                                          checked={formik.values.unitType === 2}
                                          onChange={() => formik.setFieldValue("unitType",2)}
                                        />
                                        <span className='fw-bold ps-2 fs-6'>
                                        {intl.formatMessage({id: 'UNIT.LIST.GROUP'})}
                                        </span>
                                      </label>
                      )
                    }
                                      
                </div>
              </div>
            </div>

            
        {/* { formik.values.unitType != 2 && (
        <div className='row mb-3'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                            {intl.formatMessage({
                              id: 'Has Unit Group',
                            })}
                          </label>
                          <div className='col-lg-8 fv-row'>
                          <div className='form-check form-check-solid form-switch'>
                          
                              <input
                                checked={unitgroupisactive}
                                onChange={(e)=> handleUnitGroup(e.target.checked)}
                                value={unitgroupisactive ? 'on' : 'off'}
                                className='form-check-input w-80px mt-2 bg-dark border-dark'
                                type='checkbox'
                                id='allowmarketing'
                                name='unitgroupcheck'
                              />
                              <label className='form-check-label'></label>
                            </div>
                            </div>
                        </div>
        )} */}
                        {/* { formik.values.unitType != 2 &&  unitgroupisactive && (
                          <div className='fv-row mb-7'>
                            <label className='required fw-bold fs-6 mb-2'>
                              {intl.formatMessage({id: 'UNIT.ADDPAGE.UNITGROUP'})}
                            </label>
                           
                            <select
                              className='form-select form-select-solid form-select-md'
                              {...formik.getFieldProps('parentUnitId')}
                              value={formik.values.parentUnitId} 
                              //  onChange={handleChangeUnitGroupId}
                            >
                              <option value=''>Seçiniz</option>
                              {unitgroups.map((unitgroup: any) => (
                                <option value={parseInt(unitgroup?.id)} key={unitgroup?.id as any}>
                                  {unitgroup?.name as any}
                                </option>
                              ))}
                            </select>
                          </div>
                           )} */}
            { formik.values.unitType == 1 && (
                          <div className='fv-row mb-7'>
                          {/* <div className='form-check form-check-solid form-switch'>
                          <label className='fw-bold mt-3'>
                            
                            {intl.formatMessage({
                              id: 'QUESTIONS.ADDPAGE.IS_SETTER',
                            })}
                          </label>

                   
                   


                              <input
                                checked={isTheSetter}
                                onChange={(e)=> setSetter(e.target.checked)}
                                value={isTheSetter ? 'on' : 'off'}
                                className='form-check-input w-30 mt-2'
                                type='checkbox'
                                id='allowmarketing'
                              />
                              <label className='form-check-label'></label>
                            </div> */}
                            <label className='required fw-bold fs-6 mb-2'>
                              {intl.formatMessage({id: 'UNIT.ADDPAGE.LEADER'})}
                            </label>
                           
                            <select
                              className='form-select form-select-solid form-select-md'
                              {...formik.getFieldProps('leaderUserId')}
                              value={formik.values.leaderUserId}
                              //  onChange={handleChangeUnitGroupId}
                            >
                              <option value=''>Seçiniz</option>
                              {leaderusers.map((leaderuser: any) => (
                                <option value={leaderuser?.id} key={leaderuser?.id as any}>
                                  {leaderuser?.fullName as any}
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
                            <option value='0'>{intl.formatMessage({id: 'USER.NEWUSER.SHIFT-TIME.MORNING'})}</option>
                            <option value='1'>{intl.formatMessage({id: 'USER.NEWUSER.SHIFT-TIME.DAY'})}</option>
                            <option value='2'>{intl.formatMessage({id: 'USER.NEWUSER.SHIFT-TIME.NIGHT'})}</option>                  
                          </select>
                            )}
                        </div>
 )}
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'UNIT.LIST.NAME'})}
          </label>
         
         
          <input
            {...formik.getFieldProps('name')}
            type='text'
            name='name'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.name && formik.errors.name},
              {
                'is-valid': formik.touched.name && !formik.errors.name,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUnitLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
          
          
        </div>
            
       
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isUnitLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>



          <button
            type='submit'
            className='btn btn-sm btn-dark'
            data-kt-items-modal-action='submit'
            disabled={isUnitLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting || isUnitLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUnitLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
