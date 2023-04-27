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

const StatusCell2: FC<Props> = ({item}) => {
  const intl = useIntl()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (item.categoryType == 'DailyShift') {
      setValue(`${intl.formatMessage({id: 'DAILY'})}`)
    } else if (item.categoryType == 'Weekly') {
      setValue(`${intl.formatMessage({id: 'WEEKLY'})}`)
    } else if (item.categoryType == 'Monthly') {
      setValue(`${intl.formatMessage({id: 'MONTHLY'})}`)
    } else if (item.categoryType == 'Quarterly') {
      setValue(`${intl.formatMessage({id: 'QUARTERLY'})}`)
    }
  }, [item])

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>{value}</span>
      </div>
    </div>
  )
}

export {StatusCell2}
