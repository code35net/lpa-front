import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createThing, updateThing} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listThings as listAuditCategories} from '../../../audit-categories/list/core/_requests'
import {listThings as listParentUnits} from '../../../units/list/core/_requests'
import {Model as AuditCategory} from '../../../audit-categories/list/core/_models'
import { useQueryRequest } from '../core/QueryRequestProvider'
import {listUsers as listUsers} from '../../../user-management/list/core/_requests'




type Props = {
  isThingLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Thing Name required'),
})

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const { state } = useQueryRequest()

  const [auditCategory, setAuditCategory] = React.useState<Array<AuditCategory>>([])
  const [parentUnitId, setParentUnitId] = React.useState([])
  const [userId, setUserId] = React.useState([])
  const [positions, setPositions] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [rawUsers, setRawUsers] = React.useState([])

  const [placeForEdit] = useState<Model>({    
    name: undefined,
    auditCategoryId: undefined,
    parentUnitId:undefined,
    shift:undefined,
    unitType:undefined,
    userId:undefined,
    categoryType: undefined,
    positionId: undefined,
    
    
    ...item,
    
  })

  console.log(state)

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {
    listAuditCategories().then((res2) => {
      setAuditCategory(res2.data || [])
    })

    listParentUnits().then((res2) => {
      setParentUnitId(res2.data || [])
    })

    listUsers().then((res2) => {
      setUserId(res2.data || [])
    })


    listUsers().then((res7) => {
      console.log(res7)
      setUsers(res7.data || [])
      setRawUsers(res7.data || [])
    })

    
  }, [])

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      // console.log(values.auditCategoryId)
      if(!values.categoryType){
        values.categoryType = 0
      }
      values.categoryType=parseInt(values.categoryType.toString())
       
      // if(!values.unitType){
      //   values.unitType = 0
      // }
      // values.unitType=parseInt(values.unitType.toString())

      if(!values.unitType){
        values.unitType = undefined
      }
      values.unitType= undefined

        let pids = ''
        const x = [values.auditCategoryId]
       
       x?.map((r) => {
          
          pids = pids + r?.toString() + ','
        })
        // console.log(pids)
        pids = pids.slice(0,-1)
      values.auditCategoryId= pids
      // console.log(values.auditCategoryId)

      if (state.id != undefined) {
        values.parentUnitId = parseInt(state.id)
    }
      // if(auditCategory.filter((a) => a.id==formik.values.auditCategoryId)[0]?.categoryType != 4)
      // {
      //   values.unitType = undefined
      // }
      // else
      // {
      //   if(!values.unitType){
      //     values.unitType = 0
      //   }
      //   values.unitType=parseInt(values.unitType.toString())
      // }
      
      if (!values.positionId && positions.length) {
        values.positionId = (positions[0] as any)?.id
      }

      if (!values.auditCategoryId && auditCategory.length) {
        values.auditCategoryId = (auditCategory[0] as any)?.id
      }

      try {
        if (isNotEmpty(values.id)) {
          await updateThing(values)
        } else {
          await createThing(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })



  const options =  { value: 'chocolate', label: 'Chocolate' }

  const handleUsers = (value: string, type: string) => {
    let filteredData = [...rawUsers]
    
    
    if (type === 'auditCategoryId' && value !== '' && value !== undefined && value !== null) {
      console.log(filteredData)
      filteredData = filteredData.filter(
        (item: any) => parseInt(item?.auditCategoryId) === parseInt(value)
      )
    }
    console.log(filteredData)

    setUsers([...filteredData])
  }

    
   


  return (
    <>
      <form id='kt_modal_add_item_form' className='form' onSubmit={formik.handleSubmit} noValidate>
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
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'POSITION_NAME'})}
          </label>
          
          <input
            //placeholder='Full name'
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
            disabled={formik.isSubmitting || isThingLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
        </div>
      
      
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDIT_CATEGORY_TYPE'})}
          </label>
          <select 
           className='form-select form-select-solid form-select-md'
           {...formik.getFieldProps('categoryType')}
           >
            <option value=''>{intl.formatMessage({id: 'DROPDOWN_SELECT'})}</option>
            <option value='0'>Daily</option>
            <option value='1'>Weekly</option>
            <option value='2'>Monthly</option>
            <option value='3'>Quarterly</option>
            <option value='4'>DailyShift</option>
            {/* <option value='5'>NonPeriod</option> */}
           </select>
          
          {formik.touched.categoryType && formik.errors.categoryType && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.categoryType}</span>
              </div>
            </div>
          )}
        </div>
       

   

        <div className='fv-row mb-7'>    
        <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'AUDIT_CATEGORY_ID'})}
          </label>     
         <select
              multiple
                  className='form-select form-multi form-select-solid form-select-md'
                  {...formik.getFieldProps('auditCategoryId')}
                  value={formik.values.auditCategoryId}
                  onChange={(e) => {
                    formik.setFieldValue('auditCategoryId', e.target.value)
                    handleUsers(e.target.value, 'auditCategoryId')
                  }}
                >
                  <option value=''>Seçiniz</option>
                  {/* ?? */}
                  {auditCategory.map((myauditcategory: any) => (
                    <option value={myauditcategory?.id} key={myauditcategory?.id as any}>
                      {myauditcategory?.name as any}
                    </option>
                  ))}
                </select>
          {/* end::Input */}
        </div>

        {/* <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'AUDITS.PLANNER.POSITION'})}</label>
              
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
             
            </div> */}

            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'AUDITS.LIST.AUDITOR'})}</label>            
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


        {/* <div className='fv-row mb-7'>    
        <label hidden={auditCategory.filter((a) => a.id==formik.values.auditCategoryId)[0]?.name != "LPA 1"} className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'UNIT_LEADER'})}
          </label>     
         <select
              
                  className='form-select form-multi form-select-solid form-select-md'
                  hidden={auditCategory.filter((a) => a.id==formik.values.auditCategoryId)[0]?.name != "LPA 1"}
                  {...formik.getFieldProps('userId')}
                  value={formik.values.userId}
                  // onChange={handleChangeDepartmentId}
                >
                  <option value=''>Seçiniz</option>
                  
                  {userId.map((user: any) => (
                    <option value={user?.id} key={user?.id as any}>
                      {user?.fullName as any}
                    </option>
                  ))}
                </select>
          
        </div> */}
  
   

    
        
        
        

        <div className='fv-row mb-7'>
          <label hidden={auditCategory.filter((a) => a.id==formik.values.auditCategoryId)[0]?.name != "LPA 1"} className='fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'UNIT_TYPE'})}
          </label>
          <select 
           className='form-select form-select-solid form-select-md'
           hidden={auditCategory.filter((a) => a.id==formik.values.auditCategoryId)[0]?.name != "LPA 1"}
           {...formik.getFieldProps('unitType')}
           >
            <option value=''>{intl.formatMessage({id: 'DROPDOWN_SELECT'})}</option>
            <option value='0'>Line</option>
            <option value='1'>Operator</option>
            <option value='2'>Setter</option>
           </select>
          
          {formik.touched.unitType && formik.errors.unitType && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.unitType}</span>
              </div>
            </div>
          )}
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-sm btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isThingLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-dark btn-active-light-dark'
            data-kt-items-modal-action='submit'
            disabled={
              isThingLoading || formik.isSubmitting || !formik.isValid || !formik.touched
            }
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'FORM.SAVE'})}</span>
            {(formik.isSubmitting || isThingLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isThingLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
