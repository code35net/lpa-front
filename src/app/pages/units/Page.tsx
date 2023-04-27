import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'
import {useEffect, useState} from 'react'

const Page = () => {
  const intl = useIntl()

  const Breadcrumbs: Array<PageLink> = [
    {
      title: `${intl.formatMessage({id: 'TITLE_DEFİNİTİONS'})}`,
      path: '/units/list',
      isSeparator: false,
      isActive: false,
    },
    // {
    //   title: 'Unit',
    //   path: '/units',
    //   isSeparator: false,
    //   isActive: false,
    //   id: '20',
    // },
    // {
    //   title: '',
    //   path: '/units',
    //   isSeparator: false,
    //   isActive: false,
    // },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const [breadcrumbs, setBreadcrumbs] = useState(Breadcrumbs)

  useEffect(() => {
    // Load the todos on mount
    const item = localStorage.getItem('department-name-breadcrumb')
    const iditem = localStorage.getItem('department-id-breadcrumb')
    if (item) {
      breadcrumbs[breadcrumbs.length - 2].title = item
      breadcrumbs[breadcrumbs.length - 2].path = '/units/list?unitId=' + iditem
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

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>
                {intl.formatMessage({id: 'QUESTIONS.TITLEE'})}
              </PageTitle>
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
