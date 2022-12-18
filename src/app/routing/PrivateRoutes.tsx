import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { Charts } from '../pages/dashboard/DashboardWrapper'
import { Reports } from '../pages/reports/ReportsWrapper'
import { Reports as QuestionReports } from '../pages/questionreport/ReportsWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {DisableSidebar} from '../../_metronic/layout/core'
import {WithChildren} from '../../_metronic/helpers'
import {EditForm} from "../pages/questions/Add"
import {SubUnitForm} from "../pages/subunits/Add"
import {UnitForm} from "../pages/units/Add"

import {UserEditForm} from "../pages/user-management/newuser"
// import {UserFullEditForm} from "../pages/user-management/edit"
import {UserPermissionForm} from "../pages/user-management/permissions"
import {RolePermissionForm} from "../pages/role-management/permissions"
// import {TemplateForm} from "../pages/answertemplates/Add"
import {EditAuditForm} from "../pages/audits/Planner"
import {EditOpAuditForm} from "../pages/audits/OpPlanner"
import {AuditDetails} from "../pages/audits/detail/auditdetail"
import {UserDetails} from "../pages/user-management/detail/userdetail"
import {AuditQuestionsForm} from "../pages/audits/detail/auditquestions"

import {ActionDetails} from "../pages/actions/detail/actiondetail"

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../pages/user-management/Page'))
  const RolesPage = lazy(() => import('../pages/role-management/Page'))
  const StaffPage = lazy(() => import('../pages/staffs/Page'))
  const ActionPage = lazy(() => import('../pages/actions/Page'))
  const DepartmentPage = lazy(() => import('../pages/departments/Page'))
  const TableReportPage = lazy(() => import('../pages/tablereport/Page'))
  const QuestionTableReportPage = lazy(() => import('../pages/questiontablereport/Page'))
  const HolidayPage = lazy(() => import('../pages/holidays/Page'))
  const PositionsPage = lazy(() => import('../pages/positions/Page'))
  const SectionsPage = lazy(() => import('../pages/sections/Page'))
  const UnitsPage = lazy(() => import('../pages/units/Page'))
  const SubUnitsPage = lazy(() => import('../pages/subunits/Page'))
  const AnswerTemplatePage = lazy(() => import('../pages/answertemplates/Page'))
  const AuditCategoryPage = lazy(() => import('../pages/auditcategories/Page'))
  const QuestionGroupPage = lazy(() => import('../pages/questioncategories/Page'))
  const QuestionPage = lazy(() => import('../pages/questions/Page'))
  const AuditPage = lazy(() => import('../pages/audits/Page'))

  // const AuditsPage = lazy(() => import('../pages/audit/Page'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/staffs' element={<StaffPage />} />
        <Route path='/actions' element={<ActionPage />} />
        <Route path='/questions/add' element={<EditForm />} />
        <Route path='/subunits/add' element={<SubUnitForm />} />
        <Route path='/units/add' element={<UnitForm />} />
        <Route path='/user-management/newuser' element={<UserEditForm />} />
        {/* <Route path='/user-management/edit' element={<UserFullEditForm />} /> */}
        {/* <Route path='/answertemplates/add' element={<TemplateForm />} /> */}
        <Route path='/audits/planner' element={<EditAuditForm />} />
        <Route path='/audits/opplanner' element={<EditOpAuditForm />} />
        <Route path='/audits/auditdetail' element={<AuditDetails />} />
        <Route path='/user-manager/userdetails' element={<UserDetails />} />
        <Route path='/actions/actiondetail' element={<ActionDetails />} />
        <Route path='/departments' element={<DepartmentPage />} />
        <Route path='/tablereport' element={<TableReportPage />} />
        <Route path='/questiontablereport' element={<QuestionTableReportPage />} />
        <Route path='/holidays' element={<HolidayPage />} />
        <Route path='/positions' element={<PositionsPage />} />
        <Route path='/auditcategories' element={<AuditCategoryPage />} />
        <Route path='/answertemplates' element={<AnswerTemplatePage />} />
        <Route path='/questiongroups' element={<QuestionGroupPage />} />
        <Route path='/questions' element={<QuestionPage />} />
        <Route path='/audits' element={<AuditPage />} />
        {/* <Route path='/audits' element={<AuditsPage />} /> */}

              <Route path='dashboard' element={<Charts />} />
              <Route path='reports' element={<Reports />} />
              <Route path='questionreport' element={<QuestionReports />} />
        <Route path='/role-management/permissions/:roleId' element={<RolePermissionForm />} />

        <Route path='/user-management/userpermission/:userId' element={<UserPermissionForm />} />
        <Route path='/audits/auditquestions/:auditId' element={<AuditQuestionsForm />} />

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
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='role-management/*'
          element={
            <SuspensedView>
              <RolesPage />
            </SuspensedView>
          }
        />
        <Route
          path='staffs/*'
          element={
            <SuspensedView>
              <StaffPage />
            </SuspensedView>
          }
        />
         <Route
          path='Actions/*'
          element={
            <SuspensedView>
              <ActionPage />
            </SuspensedView>
          }
        />
        <Route
          path='/departments/*'
          element={
            <SuspensedView>
              <DepartmentPage />
            </SuspensedView>
          }
        />
        <Route
          path='/tablereport/*'
          element={
            <SuspensedView>
              <TableReportPage />
            </SuspensedView>
          }
        />
        <Route
          path='/questiontablereport/*'
          element={
            <SuspensedView>
              <QuestionTableReportPage />
            </SuspensedView>
          }
        />
        <Route
          path='/holidays/*'
          element={
            <SuspensedView>
              <HolidayPage />
            </SuspensedView>
          }
        />
        <Route
          path='/sections/*'
          element={
            <SuspensedView>
              <SectionsPage />
            </SuspensedView>
          }
        />
        <Route
          path='/units/*'
          element={
            <SuspensedView>
              <UnitsPage />
            </SuspensedView>
          }
        />
        <Route
          path='/subunits/*'
          element={
            <SuspensedView>
              <SubUnitsPage />
            </SuspensedView>
          }
        />

        <Route
          path='positions/*'
          element={
            <SuspensedView>
              <PositionsPage />
            </SuspensedView>
          }
        />
        <Route
          path='auditcategories/*'
          element={
            <SuspensedView>
              <AuditCategoryPage />
            </SuspensedView>
          }
        />
        <Route
          path='answertemplates/*'
          element={
            <SuspensedView>
              <AnswerTemplatePage />
            </SuspensedView>
          }
        />
        <Route
          path='questiongroups/*'
          element={
            <SuspensedView>
              <QuestionGroupPage />
            </SuspensedView>
          }
        />
        <Route
          path='questions/*'
          element={
            <SuspensedView>
              <QuestionPage />
            </SuspensedView>
          }
        />
        <Route
          path='audits/*'
          element={
            <SuspensedView>
              <AuditPage />
            </SuspensedView>
          }
        />
        <Route
          path='dashboard/*'
          element={
            <SuspensedView>
              <Charts />
            </SuspensedView>
          }
        />
        <Route
            path='reports/*'
            element={
                <SuspensedView>
                    <Reports />
                </SuspensedView>
            }
        />
        <Route
            path='questionreport/*'
            element={
                <SuspensedView>
                    <QuestionReports />
                </SuspensedView>
            }
        />
        {/* <Route
          path='apps/audit/*'
          element={
            <SuspensedView>
              <AuditsPage />
            </SuspensedView>
          }
        />
         */}
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
