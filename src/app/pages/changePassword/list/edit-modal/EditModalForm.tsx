import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {listUsers} from '../../list/core/_requests'

type Props = {
  isQuestionLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  fullName: Yup.string().max(50, 'Maximum 50 symbols').required('Question required'),
})

const EditModalForm: FC<Props> = ({item, isQuestionLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [users, setUsers] = React.useState([])
  const [isDeleted, setIsDeleted] = React.useState(false)
  useEffect(() => {
    listUsers().then((res) => {
      setUsers(res.data)
    })
  }, [])

  console.log(item, 'test')
  const [placeForEdit] = useState<Model>({
    // fullName: undefined,
    // identity: undefined,
    // isDeleteUser: false,
    // userId: undefined,
    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        // values.isDeleteUser = isDeleted
        // values.userId = !isDeleted ? "" : values.userId
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } /*else {
          await createUser(values)
        }*/
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return <>{(formik.isSubmitting || isQuestionLoading) && <ListLoading />}</>
}

export {EditModalForm}
