import React, {FC, useState} from 'react'
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
  ChartsWidget4,
  ChartsWidget5,
  ChartsWidget6,
  ChartsWidget7,
  ChartsWidget8,
} from '../../../_metronic/partials/widgets'
import {useAuth} from '../../modules/auth'

const Charts: FC = () => {
  const [reportsInfoPercentage, setReportsInfoPercentage] = useState()
  const {currentUser} = useAuth()
  console.log(currentUser)
  const fileUrl = 'http://freudapi.iqualitor.com/Files/file/katalog.pdf'
  const fileUrl2 = 'http://freudapi.iqualitor.com/Files/file/örnekpdf.pdf'
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12'>
          <ChartsWidget1
            reportsInfo={reportsInfoPercentage}
            setReportsInfo={setReportsInfoPercentage}
            className='card-xl-stretch mb-xl-8'
          />
        </div>
        {currentUser?.roleName == 'Key Account' ? (
          <div>
            <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
              Dökümanı indirmek için tıklayın
            </a>
          </div>
        ) : (
          <div>
            <a href={fileUrl2} target='_blank' rel='noopener noreferrer'>
              Dökümanı indirmek için tıklayın
            </a>
          </div>
        )}
      </div>
      {/* end::Row */}

      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className='row g-5 g-xl-8'>
      <div className='col-xl-12'>
          <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div> */}

      {/* <div className='row g-5 g-xl-8'>
      
        <div className='col-xl-12'>
          <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div> */}
      {/* end::Row */}

      {/* begin::Row */}

      {/* end::Row */}
    </>
  )
}

export {Charts}
