/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'

type Props = {
  item: any
}

const LateCell: FC<Props> = ({item}) => {
  const intl = useIntl()
  const [isLate, setIsLate] = useState<any>(`${intl.formatMessage({id: 'No'})}`)
  //   console.log(item)
  function parseDate(dateStr: any) {
    const [day, month, year] = dateStr.split('.').map(Number)
    return new Date(year, month - 1, day)
  }
  useEffect(() => {
    const today = new Date() // Şu anki tarih ve saat
    const lastDateTime: any = parseDate(item?.lastDate) // lastDate tarih ve saati
    const endDateTime: any = parseDate(item?.endDate)
    console.log(item)
    console.log(lastDateTime)
    console.log(endDateTime)
    if (isNaN(lastDateTime) || isNaN(endDateTime)) {
      setIsLate(`${intl.formatMessage({id: '-'})}`)
    } else if (lastDateTime < endDateTime) {
      setIsLate(`${intl.formatMessage({id: 'YES'})}`)
    } else setIsLate(`${intl.formatMessage({id: 'No'})}`)
  }, [])
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>{isLate}</span>
      </div>
    </div>
  )
}

export {LateCell}
