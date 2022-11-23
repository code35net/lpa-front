import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'


// const Breadcrumbs: Array<PageLink> = [
//   {
//     title: 'Position Management',
//     path: '/positions/list',
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
          path='list'
          element={
            <>
              <PageTitle>{intl.formatMessage({id: 'UNITGROUP.PAGE.TITLE'})}</PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/unitgroup/list' />} />
    </Routes>
  )
}

export default Page
