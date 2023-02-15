import {EnableSidebar, PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget4,
  ListsWidget5,
  TablesWidget9,
  MixedWidget13,
  MixedWidget14,
  MixedWidget15,
} from '../../../_metronic/partials/widgets'
import {useAuth} from '../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {FC} from 'react'
import {Link} from 'react-router-dom'



const DashboardPage = () => (
  <>
    
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-center flex-column-fluid p-20'>
        {/* begin::Illustration */}
        <img
          src={toAbsoluteUrl('/media/logos/logo.png')}
          alt=''
          className='mw-100 mb-10 h-lg-150px'
        />


        
        
      </div>
    </div>
    
  </>
)

const DashboardWrapper = () => {
    const { currentUser, setCurrentUser, saveAuth, logout } = useAuth()
    if (currentUser?.fullName == null) {
        setCurrentUser(undefined)
        saveAuth(undefined)
        //logout()
    }
    console.log(currentUser)
  return (
    <EnableSidebar>
      <PageTitle breadcrumbs={[]}>
          {currentUser?.fullName}{currentUser?.email}
      </PageTitle>
      <DashboardPage />
    </EnableSidebar>
  )
}

export {DashboardWrapper}
