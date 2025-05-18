import { Routes, Route } from 'react-router-dom'
import LoginnedMainPage from './pages/loginned_main_page'
import LoginPage from './pages/login_page'
import RegisterPage from './pages/register_page'
import PushSignaturePage from './pages/push_signature_page'
import CreateSignaturePage from './pages/create_signature_page'
import QRCodePage from './pages/qrcode_page'
import LookUpListPage from './pages/lookup_list_page'

function App() {
  return (
    <Routes>
      <Route path="/:sessionId?" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/main" element={<LoginnedMainPage />} />
      <Route path="/main/signature/push/:sessionId" element={<PushSignaturePage />} />
      <Route path="/main/signature/create" element={<CreateSignaturePage />} />
      <Route path="/main/qrcode/:sessionId/:course" element={<QRCodePage />} />
      <Route path="/main/lookup/:sessionId" element={<LookUpListPage />} />
    </Routes>
  )
}

export default App
