/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import { Link } from 'react-router-dom'


type Props = {
  item: Model
}

const LinkCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <span className='text-gray-800'>
      <Link to={`/survey-group/list?surveyId=${item.id}`}> {item.name}</Link>  
      </span>
    </div>
  </div>
  
)

export {LinkCell}
