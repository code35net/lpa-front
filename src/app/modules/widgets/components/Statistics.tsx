import React, {FC} from 'react'
import {
  StatisticsWidget1,
  StatisticsWidget2,
  StatisticsWidget3,
  StatisticsWidget4,
  StatisticsWidget5,
  StatisticsWidget6,
} from '../../../../_metronic/partials/widgets'

const Statistics: FC = () => {
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'></div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'></div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'>
          <StatisticsWidget3
            className='card-xl-stretch mb-xl-8'
            color='success'
            title='Weekly Sales'
            description='Your Weekly Sales Chart'
            change='+100'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget3
            className='card-xl-stretch mb-xl-8'
            color='danger'
            title='Authors Progress'
            description='Marketplace Authors Chart'
            change='-260'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget3
            className='card-xl-stretch mb-5 mb-xl-8'
            color='primary'
            title='Sales Progress'
            description='Marketplace Sales Chart'
            change='+180'
          />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'>
          <StatisticsWidget4
            className='card-xl-stretch mb-xl-8'
            svgIcon='/media/icons/duotune/ecommerce/ecm002.svg'
            color='info'
            description='Sales Change'
            change='+256'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget4
            className='card-xl-stretch mb-xl-8'
            svgIcon='/media/icons/duotune/general/gen025.svg'
            color='success'
            description='Weekly Income'
            change='750$'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget4
            className='card-xl-stretch mb-5 mb-xl-8'
            svgIcon='/media/icons/duotune/finance/fin006.svg'
            color='primary'
            description='New Users'
            change='+6.6K'
          />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-4'></div>

        <div className='col-xl-4'></div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}

      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-3'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='success'
            title='Avarage'
            description='Project Progress'
            progress='50%'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='warning'
            title='48k Goal'
            description='Company Finance'
            progress='15%'
          />
        </div>

        <div className='col-xl-4'>
          <StatisticsWidget6
            className='card-xl-stretch mb-xl-8'
            color='primary'
            title='400k Impressions'
            description='Marketing Analysis'
            progress='76%'
          />
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

export {Statistics}
