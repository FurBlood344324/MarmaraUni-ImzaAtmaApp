import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()

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
  return (
    <Layout username="">
      <Card>Register</Card>
    </Layout>
  )
}

export default RegisterPage
