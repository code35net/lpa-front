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

const LateCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
    <span className='text-gray-800 text-hover-primary'>
    {item.questionCategoryName}
      </span>
    </div>
  </div>
)

export {LateCell}
