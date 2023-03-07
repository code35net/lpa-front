import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {LinkCell} from './LinkCell'
import {useIntl} from 'react-intl'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'

const Columns: ReadonlyArray<Column<Model>> = [
  
  
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ID'})} className='min-w-125px' />,
    id: 'id',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDIT_CHANGE_TEXT'})} className='min-w-125px' />,
    id: 'text',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].text} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDIT_CHANGE_AUDIT'})} className='min-w-125px' />,
    id: 'auditId',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].audit?.id} />,
  },

  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDIT_CHANGE_UNIT_OLD'})} className='min-w-125px' />,
    id: 'oldunitId',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].audit.unit?.name} />,
  },

  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDIT_CHANGE_UNIT'})} className='min-w-125px' />,
    id: 'unitId',
    Cell: ({...props}) => <InfoCell item={props.data[props.row.index].unit?.name} />,
  },

  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'AUDIT_CHANGE_ISACCEPTED'})} className='min-w-125px' />,
  //   id: 'isAccepted',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].isAccepted} />,
  // },


  
  
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEY.HASCOMMENT'})} className='min-w-125px' />,
  //   id: 'hasComment',
  //   Cell: ({...props}) => <InfoCell item={props.data[props.row.index].hasComment ? 'Evet': 'Hayır' } />,
  // },
   {
     Header: (props) => (
       <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})} className='text-end min-w-100px' />
     ),
     id: 'actions',
     Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
   }, 
]

export {Columns}
