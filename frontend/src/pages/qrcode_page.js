import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import Layout from '../components/layout'
import Card from '../components/ui/card'
import Title from '../components/ui/title'
import Button from '../components/ui/button'
import Text from '../components/ui/text'

const QRCodePage = () => {
  const navigate = useNavigate()
  const { sessionId, course } = useParams()

  const studentURL = `http://10.0.60.46:3000/${sessionId}`

  const handleClick = () => {
    navigate(`/main/lookup/${sessionId}`)
  }

  return (
    <Layout>
      <Card>
        <Title>{course} için QR Kod</Title>
        <div className="mt-6 flex flex-col items-center">
          <Text className="mb-2">QR kodu okutunuz</Text>
          <QRCodeCanvas value={studentURL} size={256} />
          <Text className="mt-4 break-all text-sm">{studentURL}</Text>
        </div>
        <Button onClick={handleClick}>Yoklama Listesi</Button>
      </Card>
    </Layout>
  )
}

export default QRCodePage
