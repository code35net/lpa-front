import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const Breadcrumbs: Array<PageLink> = [
    {
      title: `${intl.formatMessage({id: 'TITLE_DEFİNİTİONS'})}`,
      path: '/answertemplates/list',
      isSeparator: false,
      isActive: false,
    },
    // {
    //   title: 'Definitions',
    //   path: '',
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
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>
                {intl.formatMessage({id: 'ANSWERTEMPLATES.PAGE.TITLE'})}
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/answertemplates/list' />} />
    </Routes>
  )
}

export default Page
