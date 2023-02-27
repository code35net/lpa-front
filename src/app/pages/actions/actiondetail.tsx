import {FC, useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {useIntl} from 'react-intl'
import {QUERIES} from '../../../_metronic/helpers'
import {useQueryResponseData, useQueryResponseLoading} from './list/core/QueryResponseProvider'
import {Columns} from './list/table/columns/_columns'
import {useQuery} from 'react-query'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import {getAuctionDetails, saveAction} from './list/core/_requests'
import moment from 'moment'
import {Model} from './list/core/_models'
import {useFormik} from 'formik'

type Props = {
  item: Model
}


const ActionDetails: FC<Props> = ({item}) => {
  const intl = useIntl()
  const navigate = useNavigate()
  
  const useLocQuery = () => {
    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }
  let query = useLocQuery()
  const actionCode: string | null = query.get('actionCode')

  const {
    
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getAuctionDetails(actionCode as string)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const [placeForEdit] = useState<Model>({
    text: undefined,
    ...item,
  })


  
  
  const formik = useFormik({
    initialValues: placeForEdit,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        await saveAction(values)
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        
      }
    },
  })


  

  return (
    <>
      
      
     
     
      <div className={`card mb-7 m-10`}>
          <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>
           Action Details
              </h3>
          </div>
        </div>
            <div className='card-body pb-0'>
            
            
              
            <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'AUDITS.DETAIL.CATEGORY'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.departmentName
                  : ''}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'AUDITS.DETAIL.DEPARTMENT'})}</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>
              {Array.isArray(response?.data) && response?.data?.length
                ? response?.data[0]?.sectionName
                : ''}
              </span>
            </div>
          </div>

          
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'AUDITS.DETAIL.PLANED'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
              {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.finding
                  : ''}
              </span>
            </div>
          </div>
      
      
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'AUDITS.DETAIL.ENDED'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
              {moment(Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.lastDate : '').format(
                            'YYYY-MM-DD HH:mm'
                          )}

            
            
              </span>
            </div>
          </div>
          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>{intl.formatMessage({id: 'AUDITS.DETAIL.STATUS'})}</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {Array.isArray(response?.data) && response?.data?.length
                  ? response?.data[0]?.status
                  : ''}
              </span>
            </div>
          </div>
              
              <div className='separator mb-4'></div>
                 
              <form className='form' onSubmit={formik.handleSubmit} noValidate>

                  <div className='mb-5'>
                        <div className='row mb-3'>
                    
                    
                   
                    </div>
                    {/* end::Text */}
                    {intl.formatMessage({id: 'AUDITS.AUDITQUEDTIONS.NOTES'})}
                    <textarea
                      className='form-control border-1 p-0 pe-5 resize-none min-h-25px'
                      rows={4}
                      // name={`${question?.id}-notes`}
                      
                      
                    ></textarea>
                   
                  </div>
                  
                  </form>
                  
            </div>
          </div>
       


      <button
        type='submit'
        style={{ width:"200px", position: "fixed", top: "600px", right: "100px" }}
        className='btn btn-sm btn-dark btn-active-light-dark  mt-3 mb-3'
        disabled={
          formik.isSubmitting || !formik.isValid || !formik.touched
        }
       
        >        
        {intl.formatMessage({id: 'ACTIONS.DETAILS.SAVE'})}
      </button>
      
      
    </>
  )
}

export {ActionDetails}
