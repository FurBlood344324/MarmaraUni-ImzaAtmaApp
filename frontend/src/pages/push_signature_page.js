import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from '../components/layout'
import Card from '../components/ui/card'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import { UserContext } from '../context/userContext'
import RadioButton from '../components/ui/radioButton'

const PushSignaturePage = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [sessionData, setSessionData] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sessions')
        const session = response.data.find((s) => s.sessionId === sessionId)
        if (session) {
          setSessionData(session)
        } else {
          alert('Oturum bulunamadı.')
          navigate('/')
        }
      } catch (error) {
        console.error('Veri alınırken hata:', error)
        alert('Bir hata oluştu.')
      }
    }

    fetchSession()
  }, [sessionId, navigate])

  const handleSubmit = () => {
    if (selectedOption === null) {
      alert('Lütfen bir seçenek seçin.')
      return
    }

    const isCorrect = selectedOption === sessionData.questions[currentQuestionIndex].correctIndex

    if (isCorrect) {
      if (currentQuestionIndex + 1 < sessionData.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      } else {
        // Önce ilgili session'ı çek
        axios
          .get(`http://localhost:3001/sessions/${sessionData.id}`)
          .then((res) => {
            const session = res.data
            const newSignature = {
              userId: user?.id,
              realName: user?.realName,
              number: user?.number,
              sessionId: sessionData.sessionId,
              course: sessionData.course,
              date: new Date().toISOString(),
            }
            // signatures dizisine ekle
            const updatedSignatures = Array.isArray(session.signatures)
              ? [...session.signatures, newSignature]
              : [newSignature]
            // Güncellenmiş session ile PUT isteği at
            return axios.put(`http://localhost:3001/sessions/${sessionData.id}`, {
              ...session,
              signatures: updatedSignatures,
            })
          })
          .then(() => {
            setCompleted(true)
          })
          .catch((error) => {
            alert('İmza kaydedilirken hata oluştu.')
            console.error('İmza kaydedilemedi:', error)
          })
      }
    } else {
      alert('Yanlış cevap verdiniz. İmza atamazsınız.')
    }
  }

  if (!sessionData) return <div>Yükleniyor...</div>
  if (completed)
    return (
      <Layout username={user?.realName}>
        <Card>
          <Title>İmza başarıyla kaydedildi.</Title>
        </Card>
      </Layout>
    )

  const currentQuestion = sessionData.questions[currentQuestionIndex]

  return (
    <Layout username={user?.realName}>
      <Card>
        <Title>Ders: {sessionData.course}</Title>
        <p className="mb-4 text-lg font-semibold">{currentQuestion.question}</p>
        <div className="mb-4 flex flex-col space-y-2">
          {currentQuestion.options.map((option, idx) => (
            <RadioButton
              key={idx}
              name="questionOption"
              label={option}
              value={idx}
              checked={selectedOption === idx}
              onChange={() => setSelectedOption(idx)}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>Cevabı Gönder</Button>
      </Card>
    </Layout>
  )
}

export default PushSignaturePage
