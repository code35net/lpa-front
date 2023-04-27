/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {Link} from 'react-router-dom'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'

type Props = {
  item: Model
}

const LinkCell: FC<Props> = ({item}) => {
  const {updateState} = useQueryRequest()
  const {refetch} = useQueryResponse()
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {item.unitType == 2 || item.unitType == 1 ? (
          <span className='text-gray-800'>{item.name}</span>
        ) : (
          <span className='text-gray-800'>
            <a
              className='link'
              style={{cursor: 'pointer'}}
              onClick={() => {
                localStorage.setItem('section-name-breadcrumb', (item as any)?.name)
                localStorage.setItem('section-id-breadcrumb', (item as any)?.id)

                updateState({id: item.id?.toString()})
                refetch()
              }}
            >
              {' '}
              {item.name}
            </a>
          </span>
        )}
      </div>
    </div>
  )
}

export {LinkCell}
