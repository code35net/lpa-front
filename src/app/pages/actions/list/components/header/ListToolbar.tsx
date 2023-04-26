import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {getActions, listActions} from '../../core/_requests'
import {useState, useEffect} from 'react'
import * as XLSX from 'xlsx'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {ListFilter} from './ListFilter'

const ListToolbar = () => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const openAddModal = () => {
    setItemIdForUpdate(null)
  }

  const handleDownloadClick = async () => {
    getActions('').then((res) => {
      const ar = [
        intl.formatMessage({id: 'Id'}),
        intl.formatMessage({id: 'ACTION.LIST.COL.FIND'}),
        intl.formatMessage({id: 'LASTDATE'}),
        intl.formatMessage({id: 'ACTION.LIST.COL.STAFF'}),
        intl.formatMessage({id: 'ANSWER'}),
        intl.formatMessage({id: 'ACTION.LIST.COL.STATUS'}),
        intl.formatMessage({id: 'CloseDate'}),
        intl.formatMessage({id: 'IsLate'}),
      ]
      const data2 = res.data?.reduce((result: any, item: any) => {
        let status = ''
        if (item.status == 0) {
          status = `${intl.formatMessage({id: 'Open'})}`
        } else if (item.status == 1) {
          status = `${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`
        } else if (item.status == 2) {
          status = `${intl.formatMessage({id: 'Close'})}`
        } else if (item.status == 3) {
          status = `${intl.formatMessage({id: 'ACTION.TABLE.Canceled'})}`
        }

        const today = new Date() // Şu anki tarih ve saat
        const lastDateTime = new Date(item?.lastDate).getTime() // lastDate tarih ve saati
        const endDateTime = new Date(item?.endDate).getTime()
        let islate = ''
        if (lastDateTime < endDateTime) {
          islate = `${intl.formatMessage({id: 'YES'})}`
        } else islate = `${intl.formatMessage({id: 'No'})}`

        result.push([
          item.id,
          item.finding,
          item.lastDate,
          item.assignedUserName,
          item.text,
          status,
          item.endDate,
          islate,
        ])
        return result
      }, [])

      data2.unshift(ar)

      const excelData = data2
      const link = document.createElement('a')
      const fileName = intl.formatMessage({id: 'Actions'}) + '.xlsx'

      const ws = XLSX.utils.aoa_to_sheet(excelData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, intl.formatMessage({id: 'Actions'}))
      const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})
      const blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  return (
    <div className='d-flex justify-content-end' data-kt-item-table-toolbar='base'>
      <ListFilter />

      <button className='btn btn-sm btn-white btn-active-dark me-3' onClick={handleDownloadClick}>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'TOOLBAR.EXPORT'})}
      </button>

      {/* <button
        type='button'
        className='btn btn-sm btn-primary btn-active-light-primary '
        onClick={openAddModal}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'ADD'})}
      </button> */}
    </div>
  )
}

export {ListToolbar}
