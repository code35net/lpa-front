import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Model} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
//import {updateAudit, listUnits} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import moment from 'moment'
import {updateAction} from '../core/_requests'
import {format} from 'date-fns'
import {FileUploader} from 'react-drag-drop-files'
import {getActions} from '../core/_requests'
import {useAuth} from '../../../../modules/auth'

const fileTypes = ['jpg', 'png']

type Props = {
  item: Model
}

// const editchema = Yup.object().shape({
//   name: Yup.string()
//     .max(50, 'Maximum 50 symbols')
//     .required('Department Name required'),
// })

const EditModalForm: FC<Props> = ({item}) => {
  const intl = useIntl()
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const {currentUser} = useAuth()

  useEffect(() => {}, [])

  const [file, setFile] = useState<any>([])

  const [placeForEdit] = useState<Model>({
    filePath: undefined,
    text: undefined,
    finding: undefined,
    lastDate: undefined,
    status: undefined,
    answerId: undefined,
    endDate: undefined,
    auditDate: undefined,
    definition: undefined,
    note: undefined,
    //auditor: undefined,
    //unitId: undefined,
    ...item,
  })
  const [filterData, setFilterData] = useState<any>([])
  useEffect(() => {
    let query = 'page=1&items_per_page=9999'
    getActions(query).then((res: any) => {
      let x = res.data.filter((value: any) => value.actionCode == item.actionCode)

      setFilterData(x[0])
    })
  }, [])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handleFileChange = (file: any) => {
    if (file) {
      setFile(file)
    }
  }
  console.log(filterData)

  const formik = useFormik({
    initialValues: placeForEdit,
    // validationSchema: editchema,

    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)

      values.file = file
      try {
        if (isNotEmpty(values.id)) {
          //values.lastDate = format(new Date(), 'yyyy-MM-dd H:mm:ss').replace(' ', 'T')
          values.status = parseInt(values.status?.toString() || '0')
          console.log(values.text)
          if (values.text == 'null' || values.text == null) {
            values.text = ''
          }
          if (values.definition == 'null' || values.definition == null) {
            values.definition = ''
          }
          console.log(values.text)
          if (formik.values.status == 2) {
            const currentDate = new Date()
            const formattedDate = `${currentDate.getFullYear()}-${(
              '0' +
              (currentDate.getMonth() + 1)
            ).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`

            values.endDate = formattedDate
          } else if (formik.values.status != 2) {
            values.endDate = '0001-01-01'
          }
          console.log(values)
          await updateAction(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  console.log(formik.values.text)

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
          <div
            className='gap-2 d-flex flex-column mb-7 pb-5 '
            style={{borderBottom: '1px solid #aeaeae'}}
          >
            <div className='d-flex flex-row gap-2'>
              <p className='fw-semibold fs-6 mb-2 min-w-90px'>
                {intl.formatMessage({id: 'AUDITS.LIST.AUDITOR'})}
              </p>
              <label className='fw-semibold fs-6 mb-2'>: {filterData?.auditorName}</label>
            </div>

            <div className='d-flex flex-row gap-2'>
              <p className='fw-semibold fs-6 mb-2 min-w-90px'>
                {intl.formatMessage({id: 'AUDITS.LIST.AUDITNAME'})}
              </p>
              <label className='fw-semibold fs-6 mb-2 '>: {filterData?.auditName}</label>
            </div>

            <div className='d-flex flex-row gap-2'>
              <p className='fw-semibold fs-6 mb-2 min-w-90px'>
                {intl.formatMessage({id: 'QUESTION.TEXT'})}
              </p>
              <label className='fw-semibold fs-6 mb-2'>: {filterData?.questionText}</label>
            </div>

            <div className='d-flex flex-row gap-2'>
              <p className='fw-semibold fs-6 mb-2 min-w-90px'>
                {intl.formatMessage({id: 'LASTDATE'})}
              </p>
              <label className='fw-semibold fs-6 mb-2'>: {filterData?.lastDate}</label>
            </div>
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'FINDINGS'})}</label>

            <input
              //placeholder='Full name'
              {...formik.getFieldProps('finding')}
              type='text'
              name='finding'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.finding ? formik.errors.finding : null},
                {
                  'is-valid': formik.touched.finding ? !formik.errors.finding : null,
                }
              )}
              autoComplete='off'
              disabled={true}
            />
            {formik.touched.finding && formik.errors.finding ? (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.finding}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>{intl.formatMessage({id: 'NOTES'})}</label>

            <input
              //placeholder='Full name'
              {...formik.getFieldProps('note')}
              type='text'
              name='note'
              value={filterData?.note}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.note ? formik.errors.note : null},
                {
                  'is-valid': formik.touched.note ? !formik.errors.note : null,
                }
              )}
              autoComplete='off'
              disabled={true}
            />
            {formik.touched.note && formik.errors.note ? (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.note}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'ANSWER'})}
            </label>

            <input
              //placeholder='Full name'
              {...formik.getFieldProps('text')}
              type='text'
              name='text'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.text && formik.errors.text},
                {
                  'is-valid': formik.touched.text && !formik.errors.text,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || formik.values.status == 2}
            />
            {formik.touched.text && formik.errors.text && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.text}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'STATUS'})}
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <select
              className='form-select form-select-solid form-select-md'
              {...formik.getFieldProps('status')}
              value={formik.values.status}

              // onChange={(e) => {
              //   SetEndDate2(e.target.value)
              // }}
            >
              <option value=''>{intl.formatMessage({id: 'DROPDOWN_SELECT'})}</option>
              {currentUser?.id == filterData?.assignedUserId ||
              currentUser?.roleName == 'Key Account' ? (
                <option value='1'>{intl.formatMessage({id: 'InProgress'})}</option>
              ) : (
                <></>
              )}
              {currentUser?.id == filterData?.auditorId ||
              currentUser?.roleName == 'Key Account' ? (
                <>
                  <option value='0'>
                    {currentUser?.roleName == 'Key Account'
                      ? intl.formatMessage({id: 'Open'})
                      : intl.formatMessage({id: 'Modal.Open'})}
                  </option>
                  <option value='2'>{intl.formatMessage({id: 'Close'})}</option>
                </>
              ) : (
                <></>
              )}
            </select>
            {/* end::Input */}
          </div>
        </div>
        {currentUser?.id == filterData?.auditorId && formik.values.status == 0 ? (
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'ACTION.LIST.COL.Definition'})}
            </label>
            <textarea
              {...formik.getFieldProps('definition')}
              name='definition'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.definition && formik.errors.definition},
                {
                  'is-valid': formik.touched.definition && !formik.errors.definition,
                }
              )}
              autoComplete='off'
            ></textarea>

            {formik.touched.definition && formik.errors.definition && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.definition}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* 
        <div className='fv-row mb-7'>
         
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'LASTDATE'})}
          </label>
          
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('lastDate')}
            type='date'
            name='lastDate'
            value={moment(formik.values.lastDate).format('YYYY-MM-DD')}
            onChange={(e) => {
              formik.setFieldValue('lastDate', new Date(e.target.value).toISOString())
            }}
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.lastDate && formik.errors.lastDate},
              {
                'is-valid': formik.touched.lastDate && !formik.errors.lastDate,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || formik.values.status == 2}
          />
          {formik.touched.lastDate && formik.errors.lastDate && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.lastDate}</span>
              </div>
            </div>
          )}
         
        </div> */}

        {/* {formik.values.endDate != null && formik.values.endDate != '0001-01-01T00:00:00' ? (
          <div className='fv-row mb-7'>
          
            <label className='required fw-bold fs-6 mb-2'>
              {intl.formatMessage({id: 'CloseDate'})}
            </label>
          
            <input
             
              {...formik.getFieldProps('endDate')}
              type='date'
              name='endDate'
              value={moment(formik.values.endDate).format('YYYY-MM-DD')}
             
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.endDate && formik.errors.endDate},
                {
                  'is-valid': formik.touched.endDate && !formik.errors.endDate,
                }
              )}
              autoComplete='off'
              disabled={true}
            />

           
          </div>
        ) : null} */}

        <div className='fv-row mb-7'>
          <label className=' fw-bold fs-6 mb-2'> {intl.formatMessage({id: 'FILE'})}</label>
          {/* <a href='' className='p-10'>
            <small style={{color: 'blue'}}>
              {intl.formatMessage({id: 'IMAGELIBRARY.FILE.TEXT'})}
            </small>
          </a> */}
          <FileUploader
            multiple={false}
            handleChange={handleFileChange}
            name='file'
            types={fileTypes}
            disabled={formik.values.status == 2}
          />
          <p>
            {/* {library?.file
                        ? `File name: ${library?.file?.[0]?.name || ''}`
                        : 'no files uploaded yet'} */}
          </p>
          {/* {formik.touched.file && formik.errors.file && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.file}</span>
              </div>
            </div>
          )} */}
        </div>

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
        {/* end::Actions */}
      </form>
      {formik.isSubmitting && <ListLoading />}
    </>
  )
}

export {EditModalForm}
