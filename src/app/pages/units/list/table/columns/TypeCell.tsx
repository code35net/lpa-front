/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'

type Props = {
  item: Model
}

const TypeCell: FC<Props> = ({item}) => {
  const intl = useIntl()
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {item.unitType == null ? '-' : null}
        {item.unitType == 0 ? `${intl.formatMessage({id: 'LINE'})}` : null}
        {item.unitType == 1 ? `${intl.formatMessage({id: 'OPERATOR'})}` : null}
        {item.unitType == 2 ? `${intl.formatMessage({id: 'SETTER'})}` : null}
      </div>
    </div>
  )
}

export {TypeCell}
