import React, {FC, useState, useEffect} from 'react'
import {ID, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Model} from './list/core/_models'
import {getRoleClaims, setClaimForRole} from './list/core/_requests'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {useIntl} from 'react-intl'
import {useParams} from 'react-router-dom'

type Props = {
  //    isPlaceLoading: boolean
  item?: Model
}

const RolePermissionForm: FC<Props> = ({item}) => {
  const intl = useIntl()

  const params = useParams()

  const [permissions, setPermissions] = React.useState<any>([])
  const [all, setAll] = React.useState<any>(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params?.roleId) {
      getRoleClaims(params?.roleId as unknown as ID).then((data) => {
        if (Array.isArray(data?.value)) {
          setPermissions([...data?.value])
        }
      })
    }
  }, [params])

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      setLoading(true)

      try {
        await setClaimForRole({
          roleId: params.roleId,
          value: permissions,
        })
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
      formik.setSubmitting(false)
    },
  })

  const handleCheckbox = (modelName: string, methodName: string, value: boolean) => {
    for (let i = 0; permissions.length; i++) {
      if (permissions[i]?.modelName === modelName) {
        let findIndex: number = permissions[i].methodList.findIndex(
          (item: any) => item.methodName === methodName
        )

        if (findIndex !== -1) {
          permissions[i].methodList[findIndex].isGranted = value
        }
        setPermissions([...permissions])
        break
      }
    }
  }

  useEffect(() => {
    if (permissions) {
      for (let i = 0; i < permissions.length; i++) {
        for (let j = 0; j < permissions[i].methodList.length; j++) {
          permissions[i].methodList[j].isGranted = all
        }
      }
      setPermissions([...permissions])
    }
  }, [all])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_notifications'
        aria-expanded='true'
        aria-controls='kt_account_notifications'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{intl.formatMessage({id: 'USER.PERMISSIONS.ROLE-AUTHORITY'})}</h3>
        </div>

        <div className='mt-2'>
          <label style={{marginRight: '10px'}} className='form-check-label mr-2' htmlFor='all'>
            All {!all ? `unselected` : `selected`}
          </label>
          <input
            id='all'
            className='form-check-input pl-2'
            type='checkbox'
            name='all'
            checked={all}
            value={all === true ? 'on' : 'off'}
            onChange={(e) => {
              setAll(e.target.checked)
            }}
          />
        </div>
      </div>

      <div id='kt_account_notifications' className='collapse show'>
        <form className='form'>
          {permissions.map((per: any, i: number) => {
            return (
              <div key={i + 'per'} className='card-body border-top px-9 pt-3 pb-4'>
                <h3>{per?.modelName}</h3>
                {per.methodList.map((method: any, j: number) => {
                  return (
                    <div
                      key={j + 'per'}
                      className='d-flex flex-direction-row justify-content-between mb-3'
                    >
                      <div>{method?.methodName}</div>
                      <div className='form-check form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name={`${per?.modelName}-${method?.methodName}-${j}`}
                          checked={method?.isGranted}
                          value={method?.isGranted === true ? 'on' : 'off'}
                          onChange={(e) => {
                            handleCheckbox(per?.modelName, method?.methodName, e.target.checked)
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='button' onClick={() => formik.handleSubmit()} className='btn btn-primary'>
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'MODALFORM.WAIT'})}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {RolePermissionForm}
