import React, {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {isNotEmpty, toAbsoluteUrl, KTSVG} from '../../../../../_metronic/helpers'
import {Model, TemplateOptions} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {
  createAnswerTemplate,
  getAnswerTemplateOptions,
  updateAnswerTemplate,
} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isTemplateLoading: boolean
  item: Model
}

const editchema = Yup.object().shape({
  answerText: Yup.string()
    .max(50, 'Maximum 50 symbols')
    .required('Answer Text required'),
})

const EditModalForm: FC<Props> = ({item, isTemplateLoading}) => {
  const intl = useIntl()
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [options, setOptions] = React.useState<Array<TemplateOptions>>([])

     
  useEffect(() => {
    if (itemIdForUpdate) {
      getAnswerTemplateOptions(itemIdForUpdate).then((data) => {
        const answers: Array<TemplateOptions> = []
        data?.answerTemplateOptions.forEach((item: any) => {
          answers.push({
            id: item.id,
            optionname: item.optionName,
            needAction: item.needAction ? true : false,
          })
        })
        formik.setFieldValue('answerText', data?.text)
        setOptions([...answers])
      })
    } else {
      setOptions([
        {
          id: 1,
          optionname: '',
          needAction: true,
        },
      ] as any)
    }
  }, [itemIdForUpdate])

  const [placeForEdit] = useState<Model>({
    ...item,
    answerText: undefined,
    templateoptions: [],
  } as Model)

  const handleTemplateOption = (id: number, optionname: string, needAction: boolean) => {
    let index = options.findIndex((option) => option.id === id)
    if (index > -1) {
      options[index].optionname = optionname
      options[index].needAction = needAction
    }
    setOptions([...options])
  }
  const addOptionItem = () => {
    if (options[options.length - 1].optionname) {
      options.push({
        id: options[options.length - 1].id + 1,
        optionname: '',
        needAction: false,
      })
      setOptions([...options])
    }
  }

  const deleteOptionItem = () => {
    if (options.length > 1) {
      options.pop()
      setOptions([...options])
    }
  }

  const handleNeedAction = (id: number) => {
    const index = options.findIndex((o) => o.id === id)
    if (index !== -1) {
      for (let i = 0; i < options.length; i++) {
        options[i].needAction = i === index
      }
    }
    setOptions([...options])
  }

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

      if (!options[options.length - 1].optionname && options.length > 1) {
        options.pop()
      }
      values.templateoptions = options

      try {
        if (isNotEmpty(values.id)) {
          await updateAnswerTemplate({
            id: values.id,
            text: values?.answerText || values?.text,
            templateoptions: (values as any)?.templateoptions || (values as any)?.answerTemplateOptions,
          })
        } else {
          await createAnswerTemplate(values)
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

          {/* begin::Preview existing avatar */}

          {/* end::Preview existing avatar */}

          {/* begin::Label */}
          {/* <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
              <input type='hidden' name='avatar_remove' />
            </label> */}
          {/* end::Label */}

          {/* begin::Cancel */}
          {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
          {/* end::Cancel */}

          {/* begin::Remove */}
          {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
          {/* end::Remove */}
        </div>
        {/* end::Image input */}

        {/* begin::Hint */}
        {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
        {/* end::Hint */}
        {/* end::Input group */}

        {/* begin::Input group */}
        <div className='fv-row mb-7'>
          {/* begin::Label */}
          <label className='required fw-bold fs-6 mb-2'>
            {intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.NAME'})}
          </label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            //placeholder='Full name'
            {...formik.getFieldProps('answerText')}
            type='text'
            name='answerText'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.answerText && formik.errors.answerText},
              {
                'is-valid': formik.touched.answerText && !formik.errors.answerText,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isTemplateLoading}
          />
          {formik.touched.answerText && formik.errors.answerText && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.answerText}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        <div className='separator separator-dashed my-6'></div>

        <div className='row mb-12'>
          {options.map((option: TemplateOptions) => {
            return (
              <div key={`${option.id}`}>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                  {option.id}. {intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.OPTIONS'})}
                </label>

                <div className='col-lg-12'>
                  <div className='row'>
                    <div className='col-md-6 fv-row'>
                      <input
                        name={`${option.id}`}
                        id={`${option.id}`}
                        onChange={(e) => {
                          handleTemplateOption(option.id, e.target.value, option.needAction)
                        }}
                        type='text'
                        className='form-control form-control-solid'
                        placeholder={intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.OPTIONTEXT'})}
                        value={option.optionname}
                      />
                    </div>
                    <div className='col-md-4 mt-3 fv-row'>
                      <label className='form-check form-check-inline form-check-solid me-5'>
                        <input
                          className='form-check-input'
                          name='needAction'
                          type='radio'
                          checked={option.needAction}
                          onChange={() => handleNeedAction(option.id)}
                        />
                        <span className='fw-bold ps-2 fs-6'>
                          {intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.NEEDACTION'})}
                        </span>
                      </label>
                    </div>
                    <div className='col-md-2 fv-row'>
                      <a
                        type='button'
                        onClick={deleteOptionItem}
                        className='btn btn-sm btn-danger btn-active-light-danger'
                      >
                        <KTSVG path='/media/icons/duotune/arrows/arr010.svg' />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='row mb-6'>
          <div className='mb-2 col-lg-4 fv-row'>
            <a
              type='button'
              onClick={addOptionItem}
              className='btn btn-sm btn-secondary btn-active-light-primary'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' />{' '}
              {intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.ADDOPTION'})}
            </a>
          </div>
        </div>

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-items-modal-action='cancel'
            disabled={formik.isSubmitting || isTemplateLoading}
          >
            {intl.formatMessage({id: 'FORM.DISCARD'})}
          </button>

          <button
            type='submit'
            className='btn btn-sm btn-dark'
            data-kt-items-modal-action='submit'
            disabled={
              isTemplateLoading || formik.isSubmitting || !formik.isValid || !formik.touched
            }
          >
            <span className='indicator-label'> {intl.formatMessage({id: 'MODALFORM.SAVE'})}</span>
            {(formik.isSubmitting || isTemplateLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isTemplateLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
