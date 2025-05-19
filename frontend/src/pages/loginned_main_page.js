import Layout from '../components/layout'
import Button from '../components/ui/button'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { URL } from '../config.js'
import Text from '../components/ui/text'

const LoginnedMainPage = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const HandleLogin = ({ path }) => {
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
        <Button classNameIn="w-full" size="lg" onClick={() => HandleLogin({ path: '/main/user' })}>
          Imza At
        </Button>
        <Button classNameIn="w-full" size="lg" onClick={() => HandleLogin({ path: '/main/admin' })}>
          Imza Olustur
        </Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default LoginnedMainPage
