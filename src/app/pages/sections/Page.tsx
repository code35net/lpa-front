import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'


const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
    
  },
  {
    title: 'Definitions',
    path: '',
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
    title: 'Department Name will be here',
    path: '/departments',
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
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>{intl.formatMessage({id: 'SECTIONS.PAGE.TITLE'})}</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/sections/list' />} />
    </Routes>
  )
}

export default Page
