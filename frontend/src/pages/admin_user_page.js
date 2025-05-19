import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { URL } from '../config.js'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import Button from '../components/ui/button'
import Text from '../components/ui/text'

const AdminUserPage = () => {
  const navigate = useNavigate()
  const [lesson, setLesson] = useState('')
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const HandleChange = (event) => {
    setLesson(event.target.value)
  }

  const HandleClick = ({ path }) => {
    navigate(path)
  }

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  useEffect(() => {
    const token = getCookie('token')

    if (!token || token === 'Unauthorized') {
      navigate('/login')
    }

    const fetchUserId = async () => {
      try {
        const response = await fetch(`${URL}/auth/getuserid`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        sessionStorage.setItem('user_id', data.user_id)
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    if (sessionStorage.getItem('user_id') === null) {
      fetchUserId()
    }
  }, [navigate])

  return (
    <Layout username="Hesabım">
      <Card className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
        <Title className="text-center">İmza Sayfası Oluştur</Title>
        <TextInput
          className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%]"
          placeholder="Ders"
          value={lesson}
          onChange={(e) => HandleChange(e)}
        />
        <Button
          classNameOut="flex justify-center pt-4"
          classNameIn="w-[51%]"
          onClick={() => HandleClick({ path: '/main/signature/create' })}
        >
          İmza Sayfası Oluştur
        </Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default AdminUserPage
