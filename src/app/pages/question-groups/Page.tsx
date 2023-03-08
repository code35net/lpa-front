import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {ListWrapper} from './list/List'
import {useIntl} from 'react-intl'

const Page = () => {
  const intl = useIntl()
  const Breadcrumbs: Array<PageLink> = [
    {
      title: `${intl.formatMessage({id: 'TITLE_CATEGORİES'})}`,
      path: '/question-groups/list',
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
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={Breadcrumbs}>
                {intl.formatMessage({id: 'QUESTION_GROUP_PAGE_TITLE'})}
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/question-groups/list' />} />
    </Routes>
  )
}

export default Page
