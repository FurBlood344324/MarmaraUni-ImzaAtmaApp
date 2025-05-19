import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  useEffect(() => {
    const token = getCookie('token')

    if (token && token !== 'Unauthorized') {
      navigate('/main')
    } else {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Layout username="Oturum Aç">
      <Card>Yönlendiriliyorsunuz...</Card>
    </Layout>
  )
}

export default MainPage
