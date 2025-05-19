import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginnedMainPage from './pages/loginned_main_page'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'
import PushSignaturePage from './pages/push_signature_page'
import CreateSignaturePage from './pages/create_signature_page'
import MainPage from './pages/main_page'
import QRCodePage from './pages/qrcode_page'
import LookUpListPage from './pages/lookup_list_page'
import NormalUserPage from './pages/normal_user_page'
import AdminUserPage from './pages/admin_user_page'
import LogoutPage from './pages/logout_page'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<LoginnedMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main/user" element={<NormalUserPage />} />
        <Route path="/main/admin" element={<AdminUserPage />} />
        <Route path="/main/signature/push/:taskid/:listid" element={<PushSignaturePage />} />
        <Route path="/main/signature/create" element={<CreateSignaturePage />} />
        <Route path="/main/qrcode/:taskid/:listid" element={<QRCodePage />} />
        <Route path="/main/lookup/:listid" element={<LookUpListPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  )
}

export default App
