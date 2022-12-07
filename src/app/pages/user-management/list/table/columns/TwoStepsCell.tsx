import {FC} from 'react'
import {useIntl} from 'react-intl'
type Props = {
  
  two_steps?: boolean
}

const TwoStepsCell: FC<Props> = ({two_steps}) => (
  
  <> {two_steps && <div className='badge badge-light-success fw-bolder'>{useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.ENABLED'})}</div>}</>
)

export {TwoStepsCell}
