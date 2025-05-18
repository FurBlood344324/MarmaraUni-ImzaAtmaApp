import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/layout'
import Card from '../components/ui/card'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate()
  const { sessionId } = useParams()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Lütfen tüm alanları doldurun.')
      return
    }

    try {
      const response = await axios.get('http://localhost:3001/users')
      const users = response.data
      const matchedUser = users.find(
        (user) => user.userName === username && user.password === password
      )

      if (matchedUser) {
        setUser({
          realName: matchedUser.realName,
          number: matchedUser.number,
        })

        if (matchedUser.role === 'student') {
          if (sessionId) {
            navigate(`/main/signature/push/${sessionId}`)
          } else {
            alert('Session ID bulunamadı. Lütfen QR kodu tekrar okutun.')
          }
        } else if (matchedUser.role === 'teacher') {
          navigate('/main/signature/create')
        } else {
          alert('Bilinmeyen rol. Yönlendirme yapılamadı.')
        }
      } else {
        alert('Kullanıcı adı veya şifre hatalı.')
      }
    } catch (error) {
      console.error('Giriş hatası:', error)
      alert('Bir hata oluştu, lütfen tekrar deneyin.')
    }
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <Layout username="">
      <Card>
        <Title>Giris Yap</Title>
        <TextInput
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between pt-2">
          <Button classNameIn="left-0" onClick={handleLogin}>
            Giris Yap
          </Button>
          <Button classNameIn="right-0" onClick={goToRegister}>
            Kayıt Ol
          </Button>
        </div>
      </Card>
    </Layout>
  )
}

export default LoginPage
