import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import {useIntl} from 'react-intl'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.QUESTION.TEXT'})} className='min-w-125px' />,
    id: 'text',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].text} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.AUDIT.CATEGORY'})} className='min-w-125px' />,
    id: 'auditCategory',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].auditCategory.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.DEP.NAME'})} className='min-w-125px' />,
    id: 'Department',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].section.department.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.SECTION.NAME'})} className='min-w-125px' />,
    id: 'Section',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].section.name} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'QUESTIONS.LIST.TABLE.UNIT.NAME'})} className='min-w-125px' />,
    id: 'Unit',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].unit?.name}  />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
