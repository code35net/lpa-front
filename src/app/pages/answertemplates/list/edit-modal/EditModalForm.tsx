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
  text: Yup.string().max(50, 'Maximum 50 symbols').required('Answer Text required'),
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
        let datatext = ''

        data?.data.forEach((item: any) => {
          answers.push({
            id: item.id,
            optionname: item.optionName,
            needAction: item.needAction ? true : false,
            isTrue: item.isTrue ? true : false,
          })
          datatext = item.answerTemplate.text
        })
        formik.setFieldValue('text', datatext)

        setOptions([...answers])
      })
    } else {
      setOptions([
        {
          id: 1,
          optionname: '',
          needAction: true,
          isTrue: true,
        },
      ] as any)
    }
  }, [itemIdForUpdate])

  const [placeForEdit] = useState<Model>({
    ...item,
    text: undefined,
    templateoptions: [],
  } as Model)

  const handleTemplateOption = (
    id: number,
    optionname: string,
    needAction: boolean,
    isTrue: boolean
  ) => {
    let index = options.findIndex((option) => option.id === id)
    if (index > -1) {
      options[index].optionname = optionname
      options[index].needAction = needAction
      options[index].isTrue = isTrue
    }
    setOptions([...options])
  }
  const addOptionItem = () => {
    if (options[options.length - 1].optionname) {
      options.push({
        id: options[options.length - 1].id + 1,
        optionname: '',
        needAction: false,
        isTrue: false,
      })
      setOptions([...options])
    }
  }

  const deleteOptionItem = (id: any) => {
    if (options.length > 1) {
      const element = options.filter((x) => x.id != id)

      // options.pop()
      setOptions([...element])
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
  const handleIsTrue = (id: number) => {
    const index = options.findIndex((o) => o.id === id)
    if (index !== -1) {
      for (let i = 0; i < options.length; i++) {
        options[i].isTrue = i === index
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
            text: values?.text || values?.text,
            templateoptions:
              (values as any)?.templateoptions || (values as any)?.answerTemplateOptions,
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
            disabled={formik.isSubmitting || isTemplateLoading}
          />
          {formik.touched.text && formik.errors.text && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.text}</span>
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
                          handleTemplateOption(
                            option.id,
                            e.target.value,
                            option.needAction,
                            option.isTrue
                          )
                        }}
                        type='text'
                        className='form-control form-control-solid'
                        placeholder={intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.OPTIONTEXT'})}
                        value={option.optionname}
                      />
                    </div>
                    <div className='col-md-2 mt-3 fv-row'>
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

                    <div className='col-md-2 mt-3 fv-row'>
                      <label className='form-check form-check-inline form-check-solid me-5'>
                        <input
                          className='form-check-input'
                          name='isTrue'
                          type='radio'
                          checked={option.isTrue}
                          onChange={() => handleIsTrue(option.id)}
                        />
                        <span className='fw-bold ps-2 fs-6'>
                          {intl.formatMessage({id: 'ANSWERTEMPLATES.LIST.ISTRUE'})}
                        </span>
                      </label>
                    </div>

                    <div className='col-md-2 fv-row'>
                      <a
                        type='button'
                        onClick={() => deleteOptionItem(option.id)}
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
                {intl.formatMessage({id: 'MODALFORM.WAIT'})}
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
