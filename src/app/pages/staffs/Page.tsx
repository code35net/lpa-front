import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'




const Page = () => {
  const intl = useIntl()
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle>Staff List</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/staffs/list' />} />
    </Routes>
  )
}

export default Page
