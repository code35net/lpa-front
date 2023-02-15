import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {DisableSidebar} from '../../_metronic/layout/core'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {AddQuestion} from '../pages/quiz/add-questions'
import {AddUser} from '../pages/course/add-user'
import {QuizQuestion} from '../pages/quiz/quiz-questions'
import { KVKK } from '../pages/static/kvkk'
import { LessonViewer } from '../pages/my-topic-lesson/LessonViewer'


const PrivateRoutes = (menus: Array<string>) => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../pages/user-management/UsersPage'))

  const AnswerTemplatePage = lazy(() => import('../pages/answertemplate/Page'))
  const SurveyPage = lazy(() => import('../pages/survey/Page'))
  const SurveyGroupPage = lazy(() => import('../pages/survey-group/Page'))
    const SurveyQuestionPage = lazy(() => import('../pages/survey-question/Page'))
    const CoursePage = lazy(() => import('../pages/course/Page'))
    const CertificatePage = lazy(() => import('../pages/my-certificate/Page'))
    const MyCoursePage = lazy(() => import('../pages/my-course/Page'))
    const MyQuizPage = lazy(() => import('../pages/my-quiz/Page'))
    const MyCourseTopicPage = lazy(() => import('../pages/my-course-topic/Page'))
    const MyTopicLessonPage = lazy(() => import('../pages/my-topic-lesson/Page'))
  const TermPage = lazy(() => import('../pages/term/Page'))
  const QuizPage = lazy(() => import('../pages/quiz/Page'))
  const QuestionBankPage = lazy(() => import('../pages/question-bank/Page'))
  const TopicPage = lazy(() => import('../pages/topic/Page'))
  const LibraryCategoryPage = lazy(() => import('../pages/library-category/Page'))
  const LibraryPage = lazy(() => import('../pages/library/Page'))
  const LessonPage = lazy(() => import('../pages/lesson/Page'))
  const Position = lazy (() => import('../pages/position/Page'))
  const AuditCategory = lazy (() => import('../pages/audit-categories/Page'))
  const QuestionCategory = lazy (() => import('../pages/question-categories/Page'))
  const Holidays = lazy (() => import('../pages/holidays/Page'))

  var usermanagementyetki = Object.keys(menus).some((key: any) => menus[key] == "useraction");
  var announcementyetki = Object.keys(menus).some((key: any) => menus[key] == "announcement");
  
  return (
    <Routes>
    <Route element={<MasterLayout {...menus || []} />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* <Route path='/course' element={<CoursePage />} /> */}
        {/* <Route path='/lesson' element={<LessonPage />} /> */}
        <Route path='/quiz/add-questions' element={<AddQuestion />} />
        <Route path='/course/add-user' element={<AddUser />} />
        <Route path='/quiz/quiz-questions' element={<QuizQuestion />} />
        <Route path='/static/kvkk' element={<KVKK />} />

              <Route path='/view-lesson' element={<LessonViewer />} />

        <Route path='/user-management/*' element={<SuspensedView><UsersPage /></SuspensedView>}/>
        
        
        {/* {announcementyetki && <Route
          path='/announcement/*'
          element={
            <SuspensedView>
              <AnnouncementPage />
            </SuspensedView>
          }
        />} */}

        
        <Route
          path='/answertemplate/*'
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
          path='/question-categories/*'
          element={
            <SuspensedView>
              <QuestionCategory />
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
          path='/survey/*'
          element={
            <SuspensedView>
              <SurveyPage />
            </SuspensedView>
          }
              />
              <Route
                  path='/my-certificate/*'
                  element={
                      <SuspensedView>
                          <CertificatePage />
                      </SuspensedView>
                  }
              />
        <Route
          path='/survey-group/*'
          element={
            <SuspensedView>
              <SurveyGroupPage />
            </SuspensedView>
          }
        />
        <Route
          path='/survey-question/*'
          element={
            <SuspensedView>
              <SurveyQuestionPage />
            </SuspensedView>
          }
        />
        
        <Route
          path='/course/*'
          element={
            <SuspensedView>
              <CoursePage />
            </SuspensedView>
          }
              />
              <Route
                  path='/my-course/*'
                  element={
                      <SuspensedView>
                          <MyCoursePage />
                      </SuspensedView>
                  }
              />
              <Route
                  path='/my-quiz/*'
                  element={
                      <SuspensedView>
                          <MyQuizPage />
                      </SuspensedView>
                  }
              />
              <Route
                  path='/my-course-topic/*'
                  element={
                      <SuspensedView>
                          <MyCourseTopicPage />
                      </SuspensedView>
                  }
              />
              <Route
                  path='/my-topic-lesson/*'
                  element={
                      <SuspensedView>
                          <MyTopicLessonPage />
                      </SuspensedView>
                  }
              />
        <Route
          path='/term/*'
          element={
            <SuspensedView>
              <TermPage />
            </SuspensedView>
          }
        />
        <Route
          path='/lesson/*'
          element={
            <SuspensedView>
              <LessonPage />
            </SuspensedView>
          }
        />
        <Route
          path='/quiz/*'
          element={
            <SuspensedView>
              <QuizPage />
            </SuspensedView>
          }
        />
        <Route
          path='/question-bank/*'
          element={
            <SuspensedView>
              <QuestionBankPage />
            </SuspensedView>
          }
        />
        <Route
          path='/topic/*'
          element={
            <SuspensedView>
              <TopicPage />
            </SuspensedView>
          }
        />
        <Route
          path='/library/*'
          element={
            <SuspensedView>
              <LibraryPage />
            </SuspensedView>
          }
        />
        <Route
          path='/library-category/*'
          element={
            <SuspensedView>
              <LibraryCategoryPage />
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
