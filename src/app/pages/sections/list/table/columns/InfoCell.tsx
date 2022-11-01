/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { Link } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: Model
}

const InfoCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
    <Link to={`/units/list?sectionId=${item.id}`}>{item.name}</Link>
     
    </div>
  </div>
)

export {InfoCell}
