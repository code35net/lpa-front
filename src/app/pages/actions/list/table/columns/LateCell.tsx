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

  useEffect(() => {
    const today = new Date() // Şu anki tarih ve saat
    const lastDateTime = new Date(item?.lastDate).getTime() // lastDate tarih ve saati
    const endDateTime = new Date(item?.endDate).getTime()
    if (lastDateTime < endDateTime) {
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
