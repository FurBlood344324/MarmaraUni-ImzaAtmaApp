import Layout from '../components/layout'
import Card from '../components/ui/card'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const HandleClick = ({ path }) => {
    if ((username !== '' && password !== '') || path === '/register') navigate(path)
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between pt-2">
          <Button classNameIn="left-0" onClick={() => HandleClick({ path: '/users' })}>
            Giris Yap
          </Button>
          <Button classNameIn="right-0" onClick={() => HandleClick({ path: '/register' })}>
            Kayıt Ol
          </Button>
        </div>
      </Card>
    </Layout>
  )
}

export default LoginPage
