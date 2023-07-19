import { memo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components'
import { Dashboard, Login, SignUp } from './pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export const App = memo(() => {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/"  >
              <Route index element={<Dashboard />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>

  );
})
