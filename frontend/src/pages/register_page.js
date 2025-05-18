import Layout from '../components/layout'
import Card from '../components/ui/card'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import Text from '../components/ui/text'
import RadioButton from '../components/ui/radioButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [newUser, setNewUser] = useState({
    realName: '',
    number: '',
    userName: '',
    email: '',
    password: '',
    role: '',
  })

  const [repassword, setRepassword] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'repassword') {
      setRepassword(value)
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: type === 'radio' ? (checked ? value : '') : value,
      }))
    }
  }

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const numberRegex = /^\d+$/

    if (
      newUser.realName.trim() === '' ||
      newUser.number.trim() === '' ||
      newUser.userName.trim() === '' ||
      newUser.email.trim() === '' ||
      newUser.password.trim() === '' ||
      repassword.trim() === '' ||
      newUser.role === ''
    ) {
      alert('Lütfen tüm alanları doldurun.')
      return false
    }

    if (!emailRegex.test(newUser.email)) {
      alert('Geçerli bir e-posta adresi girin.')
      return false
    }

    if (!numberRegex.test(newUser.number)) {
      alert('Numara sadece rakamlardan oluşmalıdır.')
      return false
    }

    if (newUser.password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır.')
      return false
    }

    if (newUser.password !== repassword) {
      alert('Şifreler eşleşmiyor.')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!isFormValid()) return

    try {
      await axios.post('http://localhost:3001/users', newUser)

      alert('Kayıt başarılı!')
      navigate('/login')
    } catch (error) {
      alert('Kayıt başarısız oldu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <Layout username="">
      <Card>
        <Title>Kayıt Ol</Title>

        <TextInput
          name="realName"
          placeholder="Ad Soyad"
          value={newUser.realName}
          onChange={handleChange}
        />

        <TextInput
          name="number"
          type="tel"
          placeholder="Numara"
          value={newUser.number}
          onChange={handleChange}
        />

        <TextInput
          name="userName"
          placeholder="Kullanıcı Adı"
          value={newUser.userName}
          onChange={handleChange}
        />

        <TextInput
          name="email"
          type="email"
          placeholder="E-posta"
          value={newUser.email}
          onChange={handleChange}
        />

        <TextInput
          name="password"
          type="password"
          placeholder="Şifre"
          value={newUser.password}
          onChange={handleChange}
        />

        <TextInput
          name="repassword"
          type="password"
          placeholder="Tekrar Şifrenizi Giriniz"
          value={repassword}
          onChange={handleChange}
        />

        <Text className="mt-4">Rol Seçin</Text>
        <div className="mb-4 mt-2 flex gap-4">
          <RadioButton
            label="Öğrenci"
            name="role"
            value="student"
            checked={newUser.role === 'student'}
            onChange={handleChange}
          />
          <RadioButton
            label="Öğretmen"
            name="role"
            value="teacher"
            checked={newUser.role === 'teacher'}
            onChange={handleChange}
          />
        </div>

        <Button classNameIn="w-full" onClick={handleSubmit}>
          Kayıt Ol
        </Button>
      </Card>
    </Layout>
  )
}

export default RegisterPage
