import Layout from '../components/layout'
import Card from '../components/ui/card'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import RadioButton from '../components/ui/radiobutton'
import Text from '../components/ui/text'
import { URL } from '../config.js'
import { useEffect } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  useEffect(() => {
    const token = getCookie('token')
    console.log(token)
    if (token && token !== 'Unauthorized') {
      navigate('/main')
    }
  })

  const HandleLogin = ({ path }) => {
    if (username === '' || password === '' || role === '') {
      setError('Boşluk bırakmayınız !')
      setVisible('')
      return
    }
    fetch(`${URL}/auth/${role}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token && data.token !== 'Unauthorized') {
          document.cookie = `token=${data.token}; path=/; max-age=7200`
          navigate(path)
        } else {
          setError('Hatalı giriş yaptınız !')
          setVisible('')
        }
      })
      .catch(() => {
        setError('Error !')
        setVisible('')
        return
      })
  }

  const HandleRegister = ({ path }) => {
    navigate(path)
  }

  const HandleChange = (event) => {
    setRole(event.target.value)
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
        <div className="flex pt-2">
          <RadioButton
            className="pr-2"
            name="role"
            value="admin"
            onChange={HandleChange}
            checked={role === 'admin'}
          />
          <Text classNameOut="pr-2">Admin</Text>
          <RadioButton
            className="pr-2"
            name="role"
            value="user"
            onChange={HandleChange}
            checked={role === 'user'}
          />
          <Text>Kullanıcı</Text>
        </div>
        <div className="flex justify-between pt-4">
          <Button classNameIn="left-0" onClick={() => HandleLogin({ path: '/main' })}>
            Giris Yap
          </Button>
          <Button classNameIn="right-0" onClick={() => HandleRegister({ path: '/register' })}>
            Kayıt Ol
          </Button>
        </div>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default LoginPage
