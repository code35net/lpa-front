import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'

// const Breadcrumbs: Array<PageLink> = [
//   {
//     title: 'Definitions',
//     path: '',
//     isSeparator: false,
//     isActive: true,
//   },
//   {
//     title: '',
//     path: '',
//     isSeparator: true,
//     isActive: true,
//   },
// ]

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
              <PageTitle>  
              {intl.formatMessage({id: 'USER.ROLE-MANAGEMENT.PAGE.TITLE'})}
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/role-management/list' />} />
    </Routes>
  )
}

export default Page
