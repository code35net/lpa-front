/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'
type Props = {
  item: Model
}

const StatusCell: FC<Props> = ({item}) => {
  const intl = useIntl()
  const [value, setValue] = useState('')
  // console.log(item.status)

  useEffect(() => {
    if (item.status == 0) {
      setValue(`${intl.formatMessage({id: 'Open'})}`)
    } else if (item.status == 1) {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`)
    } else if (item.status == 2) {
      setValue(`${intl.formatMessage({id: 'Close'})}`)
    } else if (item.status == 3) {
      setValue(`${intl.formatMessage({id: 'ACTION.TABLE.Canceled'})}`)
    } else setValue(``)
  }, [item])

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>
          {/* {item?.status == 'NotStarted'
            ? `${intl.formatMessage({id: 'ACTION.TABLE.NOTSTART'})}`
            : item?.status == 'Inprogress'
            ? `${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`
            : `${intl.formatMessage({id: 'ACTION.TABLE.FINISHED'})}`} */}
          {value}
        </span>
      </div>
    </div>
  )
}

export {StatusCell}
