import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {LinkCell} from './LinkCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {useIntl} from 'react-intl'
import {CustomHeader} from './CustomHeader'
import {SelectionHeader} from './SelectionHeader'
import {Model} from '../../core/_models'
import { Link } from 'react-router-dom'


const Columns: ReadonlyArray<Column<Model>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({ id: 'TERM.NAME' })} className='min-w-125px' />,
        id: 'termSname',
        Cell: ({ ...props }) => <InfoCell item={props.data[props.row.index].courseTerm?.termName} />,
    },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.NAME'})} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <LinkCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.DESCRIPTION'})} className='min-w-125px' />,
    id: 'description',
      Cell: ({ ...props }) => <InfoCell item={props.data[props.row.index].courseTerm?.course?.description} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.DURATION'})} className='min-w-125px' />,
    id: 'duration',
      Cell: ({ ...props }) => <InfoCell item={props.data[props.row.index].courseTerm?.course?.duration} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'SURVEY.NAME'})} className='min-w-125px' />,
    id: 'Survey',
      Cell: ({ ...props }) => <InfoCell item={props.data[props.row.index].courseTerm?.course?.survey?.name ? props.data[props.row.index].courseTerm?.course?.survey?.name : 'Anket Yok' }  />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'COURSE.ISEXERCISE'})} className='min-w-125px' />,
    id: 'isExercise',
      Cell: ({ ...props }) => <InfoCell item={props.data[props.row.index].courseTerm?.course?.isExercise ? 'Evet': 'Hayır' } />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={useIntl().formatMessage({id: 'LIST.TABLE.ACTIONS'})} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {Columns}
