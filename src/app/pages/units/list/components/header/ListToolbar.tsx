import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getThings} from '../../core/_requests'
import {FC, useContext, useState, useEffect, useRef} from 'react'
import {stringifyRequestQuery} from '../../../../../../_metronic/helpers'

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  const {state} = useQueryRequest()
  const {updateState} = useQueryRequest()
  const {refetch} = useQueryResponse()

  const [query, setquery] = useState<string>(stringifyRequestQuery(state))
  const [oldqueries, setoldqueries] = useState<Array<string>>([])

  const [chk, setchk] = useState<boolean>(false)
  const [chk2, setchk2] = useState<boolean>(false)

  useEffect(() => {
    if (chk != chk2) {
      setchk(chk2)
    } else {
      setquery(stringifyRequestQuery(state))
      oldqueries.push(query)
      setoldqueries(oldqueries)
    }
  }, [state])

  const back = () => {
    setchk(!chk)
    console.log(oldqueries)
    let oq = oldqueries[oldqueries.length - 1]
    let q = oq.split('id=')[1]
    oldqueries.pop()
    console.log(oldqueries)
    setoldqueries(oldqueries)
    //console.log(q)
    //console.log('x')
    if (q == undefined) {
      updateState({id: '0'})
      refetch()
    } else {
      updateState({id: q.toString()})
      refetch()
    }
  }
  // console.log(state)
  // console.log(query)
  // console.log(oldquery)
  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
      <button
        type='reset'
        onClick={() => back()}
        className='btn btn-sm btn-light me-3'
        data-kt-items-modal-action='cancel'
      >
        {intl.formatMessage({id: 'AUTH.GENERAL.BACK_BUTTON'})}
      </button>
      <button
        type='button'
        className='btn btn-sm btn-primary btn-active-light-primary '
        onClick={openAddModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'LIST.BUTTON.ADD'})}
      </button>
    </div>
  )
}

export {ListToolbar}
