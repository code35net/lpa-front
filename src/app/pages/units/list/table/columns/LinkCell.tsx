/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import { Link } from 'react-router-dom'
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
      <span className='text-gray-800'>
      <a className="link" style={{cursor: "pointer"}} onClick={()=> {
        console.log(item.id?.toString())
        updateState({id: item.id?.toString()})
        refetch()
      }}> {item.name}</a>  
      </span>
    </div>
  </div>
  
)
  }

export {LinkCell}
