import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Layout from '../components/layout'
import Card from '../components/ui/card'
import TextInput from '../components/ui/textinput'
import Button from '../components/ui/button'
import Title from '../components/ui/title'
import RadioButton from '../components/ui/radioButton'

const CreateQuestionPage = () => {
  const navigate = useNavigate()
  const [courseName, setCourseName] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIndex, setCorrectIndex] = useState(null)
  const [questions, setQuestions] = useState([])
  const [signatures, setSignatures] = useState([])

  const handleOptionChange = (value, index) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const addQuestion = () => {
    if (questionText === '' || options.some((opt) => opt === '') || correctIndex === null) {
      alert('Lütfen tüm alanları doldurun ve doğru cevabı seçin.')
      return
    }

    const newQuestion = {
      question: questionText,
      options,
      correctIndex,
    }

    setQuestions([...questions, newQuestion])
    setQuestionText('')
    setOptions(['', '', '', ''])
    setCorrectIndex(null)
  }

  const submitQuestions = async () => {
    if (courseName === '' || questions.length === 0) {
      alert('Ders adı girin ve en az bir soru ekleyin.')
      return
    }

    const sessionId = uuidv4()

    try {
      await axios.post('http://localhost:3001/sessions', {
        sessionId,
        course: courseName,
        questions,
        signatures,
      })

      alert('Sorular başarıyla kaydedildi.')
      navigate(`/main/qrcode/${sessionId}/${courseName}`)
    } catch (error) {
      console.error('Gönderim hatası:', error)
      alert('Bir hata oluştu.')
    }
  }

  return (
    <Layout>
      <Card>
        <Title>Ders Adı</Title>
        <TextInput
          placeholder="Ders adı giriniz"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <Title className="mt-4">Soru Oluştur</Title>
        <TextInput
          placeholder="Soru kökü"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        {options.map((opt, i) => (
          <div key={i} className="mt-2 flex items-center">
            <RadioButton checked={correctIndex === i} onChange={() => setCorrectIndex(i)} />
            <TextInput
              placeholder={`Şık ${String.fromCharCode(65 + i)}`}
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, i)}
            />
          </div>
        ))}

        <div className="mt-4 flex gap-4">
          <Button onClick={addQuestion}>Soruyu Ekle</Button>
          <Button onClick={submitQuestions}>Soruları Tamamla</Button>
        </div>

        {questions.length > 0 && (
          <div className="mt-6">
            <Title>Eklenen Sorular</Title>
            <ul className="ml-6 list-disc">
              {questions.map((q, idx) => (
                <li key={idx}>{q.question}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </Layout>
  )
}

export default CreateQuestionPage
