import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Title from '../components/ui/title'
import Button from '../components/ui/button'

const LogoutPage = () => {
  const navigate = useNavigate()

  const HandleLogout = () => {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('task_id')
    sessionStorage.removeItem('list_id')
    Cookies.remove('token')
    navigate('/login')
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
  })

  return (
    <Layout username="Hesabım">
      <Card className="w-[55%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] 2xl:w-[10%]">
        <Title className="flex justify-center">Hesabım</Title>
        <Button
          onClick={HandleLogout}
          classNameOut="flex justify-center pt-4"
          classNameIn="w-[80%]"
        >
          Çıkış Yap
        </Button>
      </Card>
    </Layout>
  )
}

export default LogoutPage
