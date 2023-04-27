import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import {DoneCell} from './DoneCell'
import {UserCell} from './UserCell'
import {StatusCell} from './StatusCell'
import {ImgCell} from './ImgCell'
import {ImgCell2} from './ImgCell2'
import {useIntl} from 'react-intl'
import {LinkCell} from './LinkCell'
import {LateCell} from './LateCell'
import {CloseDateCell} from './closeDate'
import {AnswerCell} from './AnswerCell'
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
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.FIND'})}
        className='min-w-175px'
      />
    ),
    id: 'finding',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].finding} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'LASTDATE'})}
        className='min-w-175px'
      />
    ),
    id: 'done',
    Cell: ({...props}) => <DoneCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.STAFF'})}
        className='min-w-175px'
      />
    ),
    id: 'fullName',
    Cell: ({...props}) => <UserCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'AUDITS.LIST.AUDITOR'})}
        className='min-w-175px'
      />
    ),
    id: 'auditorName',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].auditorName} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'AUDITS.LIST.AUDITNAME'})}
        className='min-w-175px'
      />
    ),
    id: 'auditName',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].auditName} />,
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ANSWER'})}
        className='min-w-175px'
      />
    ),
    id: 'text',
    Cell: ({...props}) => <AnswerCell item={props.data[props.row.index].text} />,
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.STATUS'})}
        className='min-w-175px'
      />
    ),
    id: 'status',
    Cell: ({...props}) => <StatusCell item={props.data[props.row.index]} />,
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.Definition'})}
        className='min-w-175px'
      />
    ),
    id: 'definition',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].definition} />,
  },

  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'ACTION.LIST.COL.PATH'})} className='min-w-125px' />,
  //   id: 'filePath',
  //   Cell: ({...props}) => <ImgCell item={props.data[props.row.index].filePath} />,
  // },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'CloseDate'})}
        className='min-w-175px'
      />
    ),
    id: 'CloseDate',
    Cell: ({...props}) => <CloseDateCell item={props.data[props.row.index].endDate} />,
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'IsLate'})}
        className='min-w-175px'
      />
    ),
    id: 'IsLate',
    Cell: ({...props}) => <LateCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.PATH'})}
        className='min-w-175px'
      />
    ),
    id: 'filePath',
    Cell: ({...props}) => <ImgCell item={props.data[props.row.index].filePath} />,
  },

  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.FILE'})}
        className='min-w-175px'
      />
    ),
    id: 'file',
    Cell: ({...props}) => <ImgCell2 item={props.data[props.row.index].file} />,
  },
  {
    Header: (props) => (
      <CustomHeader
        tableProps={props}
        title={useIntl().formatMessage({id: 'ACTION.LIST.COL.ACTIONS'})}
        className='text-end min-w-100px'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell item={props.data[props.row.index]} />,
  },
]

export {Columns}
