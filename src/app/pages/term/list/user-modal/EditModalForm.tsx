import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model, TermUser} from '../core/_models'
import clsx from 'clsx'
import {listUsers} from '../../../user-management/users-list/core/_requests'
import {useListView} from '../core/ListViewProvider'
import { ListLoading } from '../components/loading/ListLoading'
import { createThing, listTermUsers, createThermUser, updateThing, deleteThermUser } from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listThings as listSurveys} from '../../../survey/list/core/_requests'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import DualListBox from 'react-dual-listbox'
import Swal from 'sweetalert2'

type Props = {
  isThingLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  termName: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Thing Name required')
})

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
    const intl = useIntl()
    const { setItemIdForUpdate } = useListView()
    const { setItemIdForUpdate2 } = useListView()
  const {refetch} = useQueryResponse()

  

  const [users, setUsers] = React.useState([])    
    
  //const qsd = parseInt(qs.parse(window.location.search, { ignoreQueryPrefix: true }).Id?.toString() || "0")

    const [selectedUsers, setSelectedUsers] = React.useState([0])
    const [selectedUsersInitial, setSelectedUsersInitial] = React.useState([0])
    //const [TermUser, setTermUser] = React.useState<TermUser>({termId: 0, userId: ""})

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const cid = searchParams.get("courseId")
  const [placeForEdit] = useState<Model>({    
    termName: undefined,
    startDay: undefined,
    endDay: undefined,
    courseId: undefined,
    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
      setItemIdForUpdate(undefined)
      if (setItemIdForUpdate2 != undefined) setItemIdForUpdate2(undefined)
  }

  useEffect(() => {
    listUsers().then((res3) => {
      setUsers( res3.data.map((a: any) => ({ value: a.id, label: a.fullName })) || [])
      //setSelectedUsers( res3.map((a: any) => (a.id)) || [0])
    })
      listTermUsers(item.id || 0).then((res1) => {
          setSelectedUsers(res1)
          setSelectedUsersInitial(res1)
      })
  }, [])

  



  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      //values.courseId = parseInt(cid?.toString() || "0")
        try {
        selectedUsers.map((c: any) => {
            if (!selectedUsersInitial.some(a => a == c)) {
                var tu = { courseTermId: parseInt(item.id?.toString() || "0"), userId: c }
                //setTermUser(tu)
                createThermUser(tu)
            }
        })

        selectedUsersInitial.map((a: any) => {
            if (!selectedUsers.some(c => c == a)) {
                deleteThermUser(a, parseInt(item.id?.toString() || "0"))
            }
        })

      } catch (ex) {
            console.error(ex)
      } finally {
            setSubmitting(true)
            cancel(true)
            Swal.fire({
                title: (intl.formatMessage({ id: "SWEETALERT.SUCCESS" })),
                text: (intl.formatMessage({ id: "SWEETALERT.SUCCESS" })),
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            })
      }
    },
  })


  const handleOnChange = (e: any) =>
  {
    console.log(e)
      setSelectedUsers([...e])  
      //console.log(selectedQuestions)
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
      
        <div className='card-body border-top p-9'>
            <DualListBox
                canFilter
                onChange={(e) => handleOnChange(e)}
                options={users}
                selected={selectedUsers}
            />
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
            className='btn btn-sm btn-info'
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
