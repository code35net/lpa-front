import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'
import {useEffect, useState} from 'react'

import qs from 'qs'

const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Departments',
    path: '/departments',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '/departments',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '/sections',
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
    const [qsd, setQsd] = useState(qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId?.toString() || "")
  
    useEffect(() => {
      // Load the todos on mount
      const item = localStorage.getItem('department-name-breadcrumb')
      const item2 = localStorage.getItem('section-name-breadcrumb')
      const iditem = localStorage.getItem('department-id-breadcrumb')

      setQsd(qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId?.toString() || "")

      console.log(qsd,"yy")
      if (item2 && item) {
        breadcrumbs[breadcrumbs.length - 3].title = item
        breadcrumbs[breadcrumbs.length - 3].path = '/sections/list?departmentId=' + iditem
        breadcrumbs[breadcrumbs.length - 2].title = item2
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
    }, [qsd])
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
         path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>{intl.formatMessage({id: 'UNIT.PAGE.TITLE'})}</PageTitle>
              <ListWrapper qsd={qsd} />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/list' />} />
    </Routes>
  )
}

export default Page
