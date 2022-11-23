import React, {FC, useState} from 'react'
import {ReportsWidget1} from './widgets'
import {ListFilter} from './header/ListFilter'

const Reports: FC = () => {


  const [reportsInfo,setReportsInfo] = useState();

  return (
    <>
      {/* begin::Row */}

      <div className='row g-5 g-xl-8'>
        <ListFilter setReportsInfo = {setReportsInfo} />
        <div className='col-xl-12'>
          <ReportsWidget1 reportsInfo = {reportsInfo} setReportsInfo = {setReportsInfo}className='card-xl-stretch mb-xl-8' />
        </div>
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

export {Reports}
