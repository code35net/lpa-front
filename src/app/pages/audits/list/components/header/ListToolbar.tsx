// import {ListFilter} from './ListFilter'
import {Link} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import {ListFilter} from './ListFilter'
import {useAuth} from '../../../../../../app/modules/auth'
import Swal from 'sweetalert2'
import {deleteAllAudit} from '../../core/_requests'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {useMutation, useQueryClient} from 'react-query'
import React, {FC, useState, useEffect} from 'react'

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }
  const {refetch} = useQueryResponse()
  const {currentUser} = useAuth()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  const deleteItem = useMutation(() => deleteAllAudit(), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      refetch()
    },
  })
  const [loading, setLoading] = useState(false)
  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
      <ListFilter />
      {/* { currentUser?.roleName == "Key Account" && (<ListFilter />) } */}
      {/* begin::Add Places */}
      {currentUser?.roleName == 'Key Account' && (
        <Link className='btn btn-sm btn-dark btn-active-light-dark me-3' to={`../Planner2`}>
          {intl.formatMessage({id: 'AUDITS.LIST.ADDINSTANT'})}
        </Link>
      )}
      {currentUser?.roleName == 'Key Account' && (
        <Link className='btn btn-sm btn-dark btn-active-light-dark me-3' to={`../Planner`}>
          {intl.formatMessage({id: 'AUDITS.LIST.ADD'})}
        </Link>
      )}
      {currentUser?.roleName == 'Key Account' && (
        <button
          className='btn btn-sm btn-dark btn-active-light-dark'
          disabled={loading}
          onClick={async () => {
            Swal.fire({
              color: '#000000',
              title: intl.formatMessage({id: 'SWEETALERT.ALL'}),
              text: intl.formatMessage({id: 'SWEETALERT.ALL2'}),
              icon: 'warning',
              // showCancelButton: true,
              // confirmButtonColor: '#000',
              // cancelButtonColor: 'primary',
              confirmButtonText: intl.formatMessage({id: 'SWEETALERT.CONFIRM'}),
              cancelButtonText: intl.formatMessage({id: 'SWEETALERT.CANCEL'}),
            }).then(async (result) => {
              if (result.isConfirmed) {
                // await deleteAllAudit().then
                setLoading(true)
                await deleteItem.mutateAsync()

                Swal.fire({
                  title: intl.formatMessage({id: 'SWEETALERT.SUCCESS'}),
                  text: intl.formatMessage({id: 'SWEETALERT.DELETED'}),
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: true,
                })
                setLoading(false)
              }
            })
          }}
        >
          {' '}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              {intl.formatMessage({id: 'WAIT.AUDITS_DELETE_ALL'})}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
          {!loading && intl.formatMessage({id: 'AUDITS_DELETE_ALL'})}
        </button>
      )}
    </div>
  )
}

export {ListToolbar}
