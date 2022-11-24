import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'

const Columns: ReadonlyArray<Column<Model>> = [
 
  {
    Header: (props) => <CustomHeader tableProps={props} title='Question Text' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Audit Category' className='min-w-125px' />,
    id: 'avarage',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].avarage} />,
  },


]

export {Columns}
