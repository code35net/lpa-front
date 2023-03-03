import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'
import {useEffect, useState} from 'react'



const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
    
  },
  {
    title: 'Unit',
    path: '/units',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '/units',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]



const Page = () => {
  const intl = useIntl()

  const [breadcrumbs, setBreadcrumbs] = useState(Breadcrumbs)

  useEffect(() => {
    // Load the todos on mount
    const item = localStorage.getItem('department-name-breadcrumb')
    const iditem = localStorage.getItem('department-id-breadcrumb')
    if (item) {
      breadcrumbs[breadcrumbs.length - 2].title = item
      breadcrumbs[breadcrumbs.length - 2].path = '/sections/list?departmentId='+iditem
      setBreadcrumbs([...breadcrumbs])
    }
    // Respond to the `storage` event
    function storageEventHandler(event: any) {
      if (event.key === 'todos') {
        breadcrumbs[breadcrumbs.length - 2].title = event.newValue
        setBreadcrumbs([...breadcrumbs])
      }
    }
    // Hook up the event handler
    window.addEventListener('storage', storageEventHandler)
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener('storage', storageEventHandler)
    }
  }, [])
  console.log(breadcrumbs)
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>units</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/units/list' />} />
    </Routes>
  )
}

export default Page
