import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'
import {UserDetail} from './userDetail'

// const Breadcrumbs: Array<PageLink> = [
//   {
//     title: 'User Management',
//     path: '/apps/user-management/users',
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: '',
//     path: '',
//     isSeparator: true,
//     isActive: false,
//   },
// ]

const Page = () => {
  const intl = useIntl()
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle>{intl.formatMessage({id: 'USER.PAGE.TITLE'})}</PageTitle>
              <ListWrapper />
            </>
          }
        />
        <Route
          path='detail'
          element={
            <>
              <PageTitle>{intl.formatMessage({id: 'USER.PAGE.TITLE.INF'})}</PageTitle>
              <UserDetail />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
    </Routes>
  )
}

export default Page
