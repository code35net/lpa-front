/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'

import {ActionDetails} from "../pages/actions/actiondetail"

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  console.log(currentUser)
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              {currentUser?.roleName == "Key Account" ? <Route index element={<Navigate to='/dashboard' />} /> : <Route index element={<Navigate to='/audits' />} />}
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
              <Route path='/actions/actiondetail' element={<ActionDetails item={{
                  id: undefined,
                  auditname: undefined,
                  departmantName: undefined,
                  sectionName: undefined,
                  unitName: undefined,
                  assignedUserName: undefined,
                  questiontext: undefined,
                  auditDate: undefined,
                  lastDate: undefined,
                  finding: undefined,
                  done: false,
                  status: 0,
                  actionCode: undefined,
                  text: undefined
                }} />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
