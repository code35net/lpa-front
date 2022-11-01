import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from "../../../_metronic/layout/core"
import {ListWrapper} from './list/List'

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
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle>Users</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
    </Routes>
  )
}

export default Page
