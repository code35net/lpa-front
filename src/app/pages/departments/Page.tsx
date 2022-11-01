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
              {/* <PageTitle breadcrumbs={Breadcrumbs}>Departments</PageTitle> */}
              <PageTitle>{intl.formatMessage({id: 'DEPARTMENTS.PAGE.TITLE'})}</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/departments/list' />} />
    </Routes>
  )
}

export default Page
