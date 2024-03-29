import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {TypeCell} from './TypeCell'
import {LinkCell} from './LinkCell'
import {useIntl} from 'react-intl'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import {StatusCell} from './StatusCell'
import {StatusCell2} from './StatusCell2'

const Columns: ReadonlyArray<Column<Model>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'LIST.TABLE.ID'})}
        className='min-w-125px'
      />
    ),
    id: 'id',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'POSITION_NAME'})}
        className='min-w-125px'
      />
    ),
    id: 'name',
    Cell: ({...props}) => <LinkCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'AUDIT_CATEGORY_NAME'})}
        className='min-w-125px'
      />
    ),
    id: 'auditCategoryName',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].auditCategoryName} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'AUDIT_CATEGORY_TYPE'})}
        className='min-w-125px'
      />
    ),
    id: 'categoryType',
    Cell: ({...props}) => <StatusCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'UNIT_TYPE'})}
        className='min-w-125px'
      />
    ),
    id: 'unitType',
    Cell: ({...props}) => <TypeCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'UNIT_LEADER'})}
        className='min-w-125px'
      />
    ),
    id: 'userName',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].userName} />,
  },

  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEY.HASCOMMENT'})} className='min-w-125px' />,
  //   id: 'hasComment',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].hasComment ? 'Evet': 'Hayır' } />,
  // },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})}
        className='text-end min-w-100px'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
