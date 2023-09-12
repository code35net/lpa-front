import React, {FC, useState, useEffect} from 'react'
import {useAuth} from '../../modules/auth'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../_metronic/helpers'
const Announcement: FC = () => {
  const [reportsInfoPercentage, setReportsInfoPercentage] = useState()
  const {currentUser}: any = useAuth()

  const intl = useIntl()
  const [data, setData]: any = useState([])

  console.log(currentUser)

  useEffect(() => {}, [])
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12'>
          {' '}
          <div className='card card-xl-stretch mb-5 mb-xl-8'>
            {/* begin::Header */}
            <div className='card-header border-0'>
              <h3 className='card-title fw-bold text-dark'>Duyurular</h3>
              <div className='card-toolbar'>
                {/* begin::Menu */}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                >
                  <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
                </button>

                {/* end::Menu */}
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body pt-0'>
              {/* begin::Item */}
              <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
                {/* begin::Icon */}
                <span className='svg-icon svg-icon-warning me-5'>
                  <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                </span>
                {/* end::Icon */}
                {/* begin::Title */}
                <div className='flex-grow-1 me-2'>
                  <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                    Freudenberg olarak, son teknolojiye sahip yeni bir otomobil ürünümüzü
                    tanıtmaktan gurur duyuyoruz! Yeni ürünümüz, performansınızı artırmanıza ve sürüş
                    deneyiminizi iyileştirmenize yardımcı olacak. Detaylar için web sitemizi ziyaret
                    edin.
                  </a>
                  <span className='text-muted fw-semibold d-block'>12.09.2023</span>
                </div>
                {/* end::Title */}
                {/* begin::Lable */}
                {/* <span className='fw-bold text-warning py-1'>+28%</span> */}
                {/* end::Lable */}
              </div>
              {/* end::Item */}
              {/* begin::Item */}
              <div className='d-flex align-items-center bg-light-success rounded p-5 mb-7'>
                {/* begin::Icon */}
                <span className='svg-icon svg-icon-success me-5'>
                  <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                </span>
                {/* end::Icon */}
                {/* begin::Title */}
                <div className='flex-grow-1 me-2'>
                  <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                    9 Eylül Türk ulusunun bağımsızlığına bağlılığının belgelerinden sadece biri.
                    İzmir'in işgalden kurtulduğu kutlu gün kutlu olsun.
                  </a>
                  <span className='text-muted fw-semibold d-block'>09.09.2023</span>
                </div>
                {/* end::Title */}
                {/* begin::Lable */}

                {/* end::Lable */}
              </div>
              {/* end::Item */}
              {/* begin::Item */}
              <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
                {/* begin::Icon */}
                <span className='svg-icon svg-icon-danger me-5'>
                  <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                </span>
                {/* end::Icon */}
                {/* begin::Title */}
                <div className='flex-grow-1 me-2'>
                  <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                    Freudenberg olarak, kalite ve güvenilirlik her zaman önceliğimizdir. Tüm
                    ürünlerimiz için uzun süreli bir kalite garantisi sunuyoruz. Müşterilerimize en
                    iyisini sunmaya devam ediyoruz.
                  </a>
                  <span className='text-muted fw-semibold d-block'>14.08.2023</span>
                </div>
                {/* end::Title */}
                {/* begin::Lable */}

                {/* end::Lable */}
              </div>
              {/* end::Item */}
              {/* begin::Item */}
              <div className='d-flex align-items-center bg-light-info rounded p-5'>
                {/* begin::Icon */}
                <span className='svg-icon svg-icon-info me-5'>
                  <KTSVG path='/media/icons/duotune/abstract/abs027.svg' className='svg-icon-1' />
                </span>
                {/* end::Icon */}
                {/* begin::Title */}
                <div className='flex-grow-1 me-2'>
                  <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                    Ürünlerimizin arkasındayız! Satış sonrası destek ekibimiz her türlü sorunuz ve
                    ihtiyacınız için burada. Yardım veya hizmet gerektiğinde lütfen bize ulaşın.
                  </a>
                  <span className='text-muted fw-semibold d-block'>10.08.2023</span>
                </div>
                {/* end::Title */}
                {/* begin::Lable */}

                {/* end::Lable */}
              </div>
              {/* end::Item */}
            </div>
            {/* end::Body */}
          </div>
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

export {Announcement}
