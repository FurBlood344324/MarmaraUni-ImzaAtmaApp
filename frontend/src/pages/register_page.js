import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { URL } from '../config.js'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import RadioButton from '../components/ui/radiobutton'
import Button from '../components/ui/button'
import Text from '../components/ui/text'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [no, setNo] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [role, setRole] = useState('')
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')
  const [isNameValid, setIsNameValid] = useState(true)
  const [isSurnameValid, setSurnameValid] = useState(true)
  const [isNoValid, setIsNoValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  useEffect(() => {
    const token = getCookie('token')
    if (token && token !== 'Unauthorized') {
      navigate('/main')
    }
  })

  const HandleChange = (event) => {
    const { name, value } = event.target

    const regexes = {
      name: /^([A-ZÇĞİÖŞÜ][a-zçğıöşü]{1,}\s?)+$/,
      surname: /^([A-ZÇĞİÖŞÜ][a-zçğıöşü]{1,}\s?)+$/,
      no: /^\d{9}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      username: /^[a-zA-Z0-9_]{3,20}$/,
      password: /^(?=.*[A-Z])[A-Za-z0-9]{6,}$/,
      role: /^(admin|user)$/,
    }

    const validateField = (field, value) => {
      const regex = regexes[field]
      return regex ? regex.test(value) : true
    }

    switch (name) {
      case 'name':
        setName(value)
        setIsNameValid(validateField('name', value))
        break
      case 'surname':
        setSurname(value)
        setSurnameValid(validateField('surname', value))
        break
      case 'no':
        setNo(value)
        setIsNoValid(validateField('no', value))
        break
      case 'email':
        setEmail(value)
        setIsEmailValid(validateField('email', value))
        break
      case 'username':
        setUsername(value)
        setIsUsernameValid(validateField('username', value))
        break
      case 'password':
        setPassword(value)
        setIsPasswordValid(validateField('password', value))
        break
      case 'repassword':
        setRepassword(value)
        break
      case 'role':
        setRole(value)
        break
      default:
        break
    }
  }

  const HandleRegister = ({ path }) => {
    if (
      name === '' ||
      surname === '' ||
      no === '' ||
      email === '' ||
      username === '' ||
      password === '' ||
      repassword === '' ||
      role === ''
    ) {
      setError('Boşluk bırakmayınız !')
      setVisible('')
      return
    }

    if (!isNameValid) {
      setError(
        'Adı yanlış girdiniz (Minimum 2 harf olacak, her kelimenin ilk harfi büyük olmalı ve özel karakter ile sayı içermemeli ) !'
      )
      setVisible('')
      return
    }

    if (!isSurnameValid) {
      setError(
        'Soyadı yanlış girdiniz (Minimum 2 harf olacak, ilk harf büyük olmalı ve özel karakter ile sayı içermemeli ) !'
      )
      setVisible('')
      return
    }

    if (!isNoValid) {
      setError('Numarayı yanlış girdiniz (9 haneden oluşup sadece sayı içermeli) !')
      setVisible('')
      return
    }

    if (!isEmailValid) {
      setError('E-Postayı yanlış girdiniz (kisi@domain.com şeklinde girilmeli)')
      setVisible('')
      return
    }

    if (!isUsernameValid) {
      setError(
        'Kullanıcı adını yanlış girdiniz (3-20 karakter olmalı ve sadece harf, rakam ile _ içerebilir) !'
      )
      setVisible('')
      return
    }

    if (!isPasswordValid) {
      setError(
        'Şifreyi yanlış girdiniz (En az bir büyük harf olmalı ve sadece harf ile sayı içerebilir) !'
      )
      setVisible('')
      return
    }

    if (repassword !== password) {
      setError('Şifreler uyuşmuyor !')
      setVisible('')
      return
    }

    const fetchUserId = async () => {
      try {
        const response = await fetch(`${URL}/auth/${role}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            surname: surname,
            no: no,
            email: email,
            username: username,
            password: password,
          }),
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        navigate(path)
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    fetchUserId()
  }

  return (
    <Layout username="Oturum Aç">
      <Card className="w-[70%] sm:w-[50%] md:w-[30%] lg:w-[20%]">
        <Title>Kayıt Ol</Title>
        <TextInput name="name" placeholder="Ad" value={name} onChange={(e) => HandleChange(e)} />
        <TextInput
          name="surname"
          placeholder="Soyad"
          value={surname}
          onChange={(e) => HandleChange(e)}
        />
        <TextInput
          name="no"
          placeholder="Okul Numarası"
          value={no}
          onChange={(e) => HandleChange(e)}
        />
        <TextInput
          name="email"
          placeholder="E-Posta"
          value={email}
          onChange={(e) => HandleChange(e)}
        />
        <TextInput
          name="username"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => HandleChange(e)}
        />
        <TextInput
          name="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => HandleChange(e)}
        />
        <TextInput
          name="repassword"
          placeholder="Yeniden Şifre"
          value={repassword}
          onChange={(e) => HandleChange(e)}
        />
        <div className="flex pt-2">
          <RadioButton
            className="pr-2"
            name="role"
            value="admin"
            onChange={(e) => HandleChange(e)}
            checked={role === 'admin'}
          />
          <Text className="pr-2">Admin</Text>
          <RadioButton
            className="pr-2"
            name="role"
            value="user"
            onChange={(e) => HandleChange(e)}
            checked={role === 'user'}
          />
          <Text>Kullanıcı</Text>
        </div>
        <div className="flex pt-4">
          <Button classNameIn="left-0" onClick={() => HandleRegister({ path: '/login' })}>
            Kayıt Ol
          </Button>
        </div>
        <Text className={`${visible} w-[100%] text-red-500 sm:w-[100%] md:w-[100%] lg:w-[100%]`}>
          {error}
        </Text>
      </Card>
    </Layout>
  )
}

export default RegisterPage
