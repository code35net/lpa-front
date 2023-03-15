import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {Charts} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {DisableSidebar} from '../../_metronic/layout/core'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {EditForm} from '../pages/questions/Add'
import {UserEditForm} from '../pages/user-management/newuser'

import {EditAuditForm} from '../pages/audits/Planner'
import {AuditDetails} from '../pages/audits/detail/auditdetail'
import {AuditQuestionsForm} from '../pages/audits/detail/auditquestions'
import {ChangeRequestPage} from '../pages/audits/Add'
import {Reports} from '../pages/reports/ReportsWrapper'
// import { Reports as QuestionReports } from '../pages/questionreport/ReportsWrapper'

const PrivateRoutes = (menus: Array<string>) => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../pages/user-management/Page'))

  const AnswerTemplatePage = lazy(() => import('../pages/answertemplates/Page'))

  const QuestionBankPage = lazy(() => import('../pages/questions/Page'))

  const Position = lazy(() => import('../pages/position/Page'))
  const Action = lazy(() => import('../pages/actions/Page'))
  const AuditCategory = lazy(() => import('../pages/audit-categories/Page'))
  const QuestionGroup = lazy(() => import('../pages/question-groups/Page'))
  const Holidays = lazy(() => import('../pages/holidays/Page'))
  const Audits = lazy(() => import('../pages/audits/Page'))
  const Units = lazy(() => import('../pages/units/Page'))
  const ChangesPassword = lazy(() => import('../pages/changePassword/Page'))
  const ChangesRequests = lazy(() => import('../pages/change-requests/Page'))
  const TableReports = lazy(() => import('../pages/tablereport/Page'))

  var usermanagementyetki = Object.keys(menus).some((key: any) => menus[key] == 'useraction')
  var announcementyetki = Object.keys(menus).some((key: any) => menus[key] == 'announcement')

  return (
    <Routes>
      <Route element={<MasterLayout {...(menus || [])} />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<Charts />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='/audits/auditdetail' element={<AuditDetails />} />
        <Route path='/audits/auditquestions/:auditId' element={<AuditQuestionsForm />} />
        <Route path='/audits/change-request/:auditId' element={<ChangeRequestPage/>} />
        {/* <Route path='/course' element={<CoursePage />} /> */}
        {/* <Route path='/lesson' element={<LessonPage />} /> */}
        <Route path='/questions/add' element={<EditForm />} />
        <Route path='/user-management/newuser' element={<UserEditForm />} />
        <Route path='/audits/Planner' element={<EditAuditForm />} />

        <Route path='reports' element={<Reports />} />
        {/* <Route path='questionreport' element={<QuestionReports />} /> */}
        <Route
          path='/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='/change-password/*'
          element={
            <SuspensedView>
              <ChangesPassword />
            </SuspensedView>
          }
        />

        {/* {announcementyetki && <Route
          path='/announcement/*'
          element={
            <SuspensedView>
              <AnnouncementPage />
            </SuspensedView>
          }
        />} */}
        <Route
          path='/actions/*'
          element={
            <SuspensedView>
              <Action />
            </SuspensedView>
          }
        />

          <Route
          path='/change-requests/*'
          element={
            <SuspensedView>
              <ChangesRequests />
            </SuspensedView>
          }
        />

            <Route
          path='/tablereport/*'
          element={
            <SuspensedView>
              <TableReports />
            </SuspensedView>
          }
        />

        <Route
          path='/answertemplates/*'
          element={
            <SuspensedView>
              <AnswerTemplatePage />
            </SuspensedView>
          }
        />

        <Route
          path='/positions/*'
          element={
            <SuspensedView>
              <Position />
            </SuspensedView>
          }
        />

        <Route
          path='/audit-categories/*'
          element={
            <SuspensedView>
              <AuditCategory />
            </SuspensedView>
          }
        />

        <Route
          path='/audits/*'
          element={
            <SuspensedView>
              <Audits />
            </SuspensedView>
          }
        />

        <Route
          path='/units/*'
          element={
            <SuspensedView>
              <Units />
            </SuspensedView>
          }
        />

        <Route
          path='/question-groups/*'
          element={
            <SuspensedView>
              <QuestionGroup />
            </SuspensedView>
          }
        />

        <Route
          path='/holidays/*'
          element={
            <SuspensedView>
              <Holidays />
            </SuspensedView>
          }
        />

        <Route
          path='/questions/*'
          element={
            <SuspensedView>
              <QuestionBankPage />
            </SuspensedView>
          }
        />

        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return (
    <Suspense fallback={<TopBarProgress />}>
      <DisableSidebar>{children}</DisableSidebar>
    </Suspense>
  )
}

export {PrivateRoutes}
