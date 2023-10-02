/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: string
}

const ImgCell: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      {item == undefined ? (
        '-'
      ) : (
        <a target={'_blank'} href={`https://freudenapi.iqualitor.com/${item}`} download>
          <span className='text-gray-800'>
            <img width='90' height='80' src={`https://freudenapi.iqualitor.com/${item}`} />
          </span>
        </a>
      )}
    </div>
  </div>
)

export {ImgCell}
