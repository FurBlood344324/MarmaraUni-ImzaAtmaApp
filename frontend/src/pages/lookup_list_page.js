import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/layout'
import Card from '../components/ui/card'
import Title from '../components/ui/title'
import Text from '../components/ui/text'
import Button from '../components/ui/button'

const LookUpListPage = () => {
  const { sessionId } = useParams()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sessions?sessionId=${sessionId}`)
        setSession(response.data[0])
      } catch (error) {
        setSession(null)
      }
    }
    fetchSession()
  }, [sessionId])

  // Yoklamayı CSV olarak indir
  const handleDownload = () => {
    if (!session || !session.signatures || session.signatures.length === 0) {
      alert('İndirilecek imza yok.')
      return
    }
    const header = 'Ad Soyad;Numara\n'
    const rows =
      session.signatures.map((sig) => `"${sig.realName}";"${sig.number}"`).join('\n') + '\n'
    const BOM = '\uFEFF'
    const csvContent = BOM + header + rows
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `yoklama_${session.course}_${session.sessionId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!session) return <div>Yükleniyor...</div>

  return (
    <Layout username="">
      <Card className="mx-auto min-w-[600px] max-w-2xl">
        <div className="mb-4 flex justify-between">
          <Title className="font-bold">Ad Soyad</Title>
          <Title className="font-bold">Numara</Title>
        </div>
        <hr className="mb-2" />
        {session.signatures && session.signatures.length > 0 ? (
          session.signatures.map((sig, idx) => (
            <div key={idx} className="grid grid-cols-2 border-b py-2">
              <Text className="truncate pr-2">{sig.realName}</Text>
              <Text className="truncate pl-2 text-right">{sig.number}</Text>
            </div>
          ))
        ) : (
          <div>Henüz imza atan yok.</div>
        )}
        <div className="flex justify-between pt-2">
          <Button classNameIn="left-0" onClick={handleDownload}>
            Yoklamayı İndir
          </Button>
          <Button classNameIn="right-0" onClick={() => window.history.back()}>
            Geri Dön
          </Button>
        </div>
      </Card>
    </Layout>
  )
}

export default LookUpListPage
