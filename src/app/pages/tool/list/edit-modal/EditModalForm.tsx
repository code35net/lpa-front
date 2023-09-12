import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createThing, updateThing} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import moment from 'moment'
import {useLocation} from 'react-router-dom'

type Props = {
  isThingLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  // whatDay: Yup.string().max(50, 'Maximum 50 symbols').required('Thing Name required'),
  // theDay: Yup.date().required('Date required'),
})

const EditModalForm: FC<Props> = ({item, isThingLoading}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [placeForEdit] = useState<Model>({
    id: undefined,
    name: undefined,
    code: undefined,
    teslimVerildigiTarih: undefined,
    teslimAlindigiTarih: undefined,
    tamirTarihi: undefined,
    İslemAdi: undefined,

    ...item,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  useEffect(() => {}, [])

  const formik = useFormik({
    initialValues: placeForEdit,
    validationSchema: editchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateThing(values)
        } else {
          await createThing(values)
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
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_item_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_item_header'
          data-kt-scroll-wrappers='#kt_modal_add_item_scroll'
          data-kt-scroll-offset='300px'
        ></div>

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'NAME'})}</label>

          <input
            //placeholder='Full name'
            {...formik.getFieldProps('name')}
            type='text'
            name='name'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.name ? formik.errors.name : null},
              {
                'is-valid': formik.touched.name ? !formik.errors.name : null,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {/* {formik.touched.whatDay && formik.errors.whatDay ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.whatDay}</span>
              </div>
            </div>
          ) : null} */}
        </div>

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'Kod'})}</label>

          <input
            //placeholder='Full name'
            {...formik.getFieldProps('code')}
            type='text'
            name='code'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.code ? formik.errors.code : null},
              {
                'is-valid': formik.touched.code ? !formik.errors.code : null,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {/* {formik.touched.whatDay && formik.errors.whatDay ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.whatDay}</span>
              </div>
            </div>
          ) : null} */}
        </div>

        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'Teslim Verilen Tarih'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('teslimVerildigiTarih')}
            type='date'
            name='teslimVerildigiTarih'
            value={moment(formik.values.teslimVerildigiTarih).format('YYYY-MM-DD')}
            onChange={(e) => {
              formik.setFieldValue('teslimVerildigiTarih', new Date(e.target.value).toISOString())
            }}
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {
                'is-invalid':
                  formik.touched.teslimVerildigiTarih && formik.errors.teslimVerildigiTarih,
              },
              {
                'is-valid':
                  formik.touched.teslimVerildigiTarih && !formik.errors.teslimVerildigiTarih,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
          />
          {/* {formik.touched.theDay && formik.errors.theDay && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.theDay}</span>
              </div>
            </div>
          )} */}
          {/* end::Input */}
        </div>
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'Teslim Alınan Tarih'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('teslimAlindigiTarih')}
            type='date'
            name='teslimAlindigiTarih'
            value={moment(formik.values.teslimAlindigiTarih).format('YYYY-MM-DD')}
            onChange={(e) => {
              formik.setFieldValue('teslimAlindigiTarih', new Date(e.target.value).toISOString())
            }}
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {
                'is-invalid':
                  formik.touched.teslimAlindigiTarih && formik.errors.teslimAlindigiTarih,
              },
              {
                'is-valid':
                  formik.touched.teslimAlindigiTarih && !formik.errors.teslimAlindigiTarih,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
          />
          {/* {formik.touched.theDay && formik.errors.theDay && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.theDay}</span>
              </div>
            </div>
          )} */}
          {/* end::Input */}
        </div>

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'İşlem Adı'})}
          </label>

          <input
            //placeholder='Full name'
            {...formik.getFieldProps('İslemAdi')}
            type='text'
            name='İslemAdi'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.İslemAdi ? formik.errors.İslemAdi : null},
              {
                'is-valid': formik.touched.İslemAdi ? !formik.errors.İslemAdi : null,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isThingLoading}
          />
          {/* {formik.touched.whatDay && formik.errors.whatDay ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.whatDay}</span>
              </div>
            </div>
          ) : null} */}
        </div>

        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'İşlem Tarihi'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('tamirTarihi')}
            type='date'
            name='tamirTarihi'
            value={moment(formik.values.tamirTarihi).format('YYYY-MM-DD')}
            onChange={(e) => {
              formik.setFieldValue('tamirTarihi', new Date(e.target.value).toISOString())
            }}
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {
                'is-invalid': formik.touched.tamirTarihi && formik.errors.tamirTarihi,
              },
              {
                'is-valid': formik.touched.tamirTarihi && !formik.errors.tamirTarihi,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting}
          />
          {/* {formik.touched.theDay && formik.errors.theDay && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.theDay}</span>
              </div>
            </div>
          )} */}
          {/* end::Input */}
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-sm btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isThingLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-dark btn-active-light-dark'
            data-kt-items-modal-action='submit'
            disabled={isThingLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'FORM.SAVE'})}</span>
            {formik.isSubmitting || isThingLoading ? (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : null}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {formik.isSubmitting || isThingLoading ? <ListLoading /> : null}
    </>
  )
}

export {EditModalForm}
