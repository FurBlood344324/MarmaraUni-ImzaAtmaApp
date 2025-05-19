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

const NormalUserPage = () => {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const HandleChange = (event) => {
    setUrl(event.target.value)
  }

  const HandleLogin = () => {
    const match = url.match(new RegExp('^https?:\\/\\/[^\\/]+(\\/.*)$'))

    if (match !== null) {
      navigate(`${match[1]}`)
    } else {
      setError('Hatalı Url Girdiniz (http://<ip>:<port>/<child_url> şeklinde bir url girilmeli)!')
      setVisible('')
      return
    }
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
        <Title className="text-center">İmza At</Title>
        <TextInput
          className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%]"
          placeholder="Url"
          value={url}
          onChange={(e) => HandleChange(e)}
        />
        <Button
          classNameOut="flex justify-center pt-4"
          classNameIn="w-[50%]"
          onClick={() => HandleLogin()}
        >
          İmza At
        </Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default NormalUserPage
