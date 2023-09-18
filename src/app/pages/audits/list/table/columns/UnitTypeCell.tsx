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

const UnitTypeCell: FC<Props> = ({item}) => {
  const intl = useIntl()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (item.unitTypeName == 'Setter') {
      setValue(`${intl.formatMessage({id: 'FILTER_SETTER'})}`)
    } else if (item.unitTypeName == 'Line') {
      setValue(`${intl.formatMessage({id: 'FILTER_LINE'})}`)
    } else if (item.unitTypeName == 'Operator') {
      setValue(`${intl.formatMessage({id: 'FILTER_OP'})}`)
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

export {UnitTypeCell}
