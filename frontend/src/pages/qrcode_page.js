import Layout from '../components/layout'
import Card from '../components/ui/card'
import { QRCodeCanvas } from 'qrcode.react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { F_URL } from '../config.js'
import { URL } from '../config.js'
import Title from '../components/ui/title'
import Button from '../components/ui/button'
import Text from '../components/ui/text'

const QRCodePage = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const { taskid, listid } = useParams()

  const QR_URL = `${F_URL}/main/signature/push/${taskid}/${listid}`

  const handleClick = ({ path }) => {
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
      <Card className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
        <Title className="flex justify-center">QR Kod</Title>
        <div className="mt-6 flex flex-col items-center pb-2">
          <Text className="mb-2">QR kodu okutunuz</Text>
          <QRCodeCanvas value={QR_URL} size={256} />
          <Text className="mt-4 break-all text-sm">{`Link: ${QR_URL}`}</Text>
        </div>
        <Button
          onClick={() => handleClick({ path: `/main/lookup/${listid}` })}
          classNameOut="flex justify-center pt-4"
          classNameIn="w-[60%]"
        >
          Yoklama Listesi
        </Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default QRCodePage
