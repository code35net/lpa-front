import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createHoliday, updateHoliday} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import moment from 'moment'

type Props = {
  isAuditCategoryLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  whatDay: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Holiday required'),
})

const EditModalForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [placeForEdit] = useState<Model>({
    whatDay: undefined,
    theDay: undefined,
    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  console.log(placeForEdit,"test")
  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)

      try {
        if (isNotEmpty(values.id)) {
          await updateHoliday(values)
        } else {
          await createHoliday(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_item_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_item_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_item_header'
          data-kt-scroll-wrappers='#kt_modal_add_item_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'HOLIDAY.LIST.WHATDAY'})}
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              //placeholder='Full name'
              {...formik.getFieldProps('whatDay')}
              type='text'
              name='whatDay'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.whatDay && formik.errors.whatDay},
                {
                  'is-valid': formik.touched.whatDay && !formik.errors.whatDay,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
            />
            {formik.touched.whatDay && formik.errors.whatDay && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.whatDay}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'HOLIDAY.LIST.THEDAY'})}
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              //placeholder='Full name'
              {...formik.getFieldProps('theDay')}
              type='date'
              name='theDay'
              value={moment(formik.values.theDay).format('YYYY-MM-DD')}
              onChange={(e) => {
                formik.setFieldValue('theDay', new Date(e.target.value).toISOString())
              }}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.theDay && formik.errors.theDay},
                {
                  'is-valid': formik.touched.theDay && !formik.errors.theDay,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
            />
            {formik.touched.theDay && formik.errors.theDay && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.theDay}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* begin::Input group */}

          {/* end::Input group */}
          {/* end::Scroll */}

          {/* begin::Actions */}
          <div className='text-center pt-15'>
            <button
              type='reset'
              onClick={() => cancel()}
              className='btn btn-light me-3'
              data-kt-items-modal-action='cancel'
              disabled={formik.isSubmitting}
            >
              {intl.formatMessage({id: 'FORM.DISCARD'})}
            </button>

            <button
              type='submit'
              className='btn btn-sm btn-dark'
              data-kt-items-modal-action='submit'
              disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
            >
              <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
              {formik.isSubmitting && (
                <span className='indicator-progress'>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
        {/* end::Actions */}
      </form>
      {formik.isSubmitting && <ListLoading />}
    </>
  )
}

export {EditModalForm}
