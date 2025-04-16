import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout"
import { links } from "./constants"

import Overview from "./pages/Overview"
import Employees from "./pages/Employees"
import AccountSettings from "./pages/AccountSettings"
import JobManagementDashboard from "./pages/Job"

import Home from "./pages"
import Login from "./pages/NewLogin"
// import Login from "./pages/Login"
import Register from "./pages/Registration"
import ForgotPassword from "./pages/ForgotPassword"

import DraftPage from "./pages/DraftPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}

          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path={links[1].href} element={<Employees />} />
            <Route path={links[2].href} element={<AccountSettings />} />
            <Route path={links[3].href} element={<JobManagementDashboard />} />
            <Route path="draft" element={<DraftPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
