import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { URL } from '../config.js'
import Text from '../components/ui/text'
import Title from '../components/ui/title'
import TextInput from '../components/ui/textinput'
import RadioButton from '../components/ui/radiobutton'
import Button from '../components/ui/button'

const CreateSignaturePage = () => {
  const navigate = useNavigate()
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [answers1, setAnswers1] = useState('')
  const [answers2, setAnswers2] = useState('')
  const [answers3, setAnswers3] = useState('')
  const [answer1A, setAnswer1A] = useState('')
  const [answer1B, setAnswer1B] = useState('')
  const [answer1C, setAnswer1C] = useState('')
  const [answer1D, setAnswer1D] = useState('')
  const [answer2A, setAnswer2A] = useState('')
  const [answer2B, setAnswer2B] = useState('')
  const [answer2C, setAnswer2C] = useState('')
  const [answer2D, setAnswer2D] = useState('')
  const [answer3A, setAnswer3A] = useState('')
  const [answer3B, setAnswer3B] = useState('')
  const [answer3C, setAnswer3C] = useState('')
  const [answer3D, setAnswer3D] = useState('')
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')

  const HandleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'question1':
        setQuestion1(value)
        break
      case 'question2':
        setQuestion2(value)
        break
      case 'question3':
        setQuestion3(value)
        break
      case 'answers1':
        setAnswers1(value)
        break
      case 'answers2':
        setAnswers2(value)
        break
      case 'answers3':
        setAnswers3(value)
        break
      case 'answer1A':
        setAnswer1A(value)
        break
      case 'answer1B':
        setAnswer1B(value)
        break
      case 'answer1C':
        setAnswer1C(value)
        break
      case 'answer1D':
        setAnswer1D(value)
        break
      case 'answer2A':
        setAnswer2A(value)
        break
      case 'answer2B':
        setAnswer2B(value)
        break
      case 'answer2C':
        setAnswer2C(value)
        break
      case 'answer2D':
        setAnswer2D(value)
        break
      case 'answer3A':
        setAnswer3A(value)
        break
      case 'answer3B':
        setAnswer3B(value)
        break
      case 'answer3C':
        setAnswer3C(value)
        break
      case 'answer3D':
        setAnswer3D(value)
        break
      default:
        break
    }
  }

  const SubmitQuestions = (e) => {
    e.preventDefault()
    if (
      question1 === '' ||
      question2 === '' ||
      question3 === '' ||
      answers1 === '' ||
      answers2 === '' ||
      answers3 === '' ||
      answer1A === '' ||
      answer1B === '' ||
      answer1C === '' ||
      answer1D === '' ||
      answer2A === '' ||
      answer2B === '' ||
      answer2C === '' ||
      answer2D === '' ||
      answer3A === '' ||
      answer3B === '' ||
      answer3C === '' ||
      answer3D === ''
    ) {
      setError('Boşluk bırakmayınız !')
      setVisible('')
      return
    }

    const create_task = async () => {
      try {
        const response = await fetch(`${URL}/task/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Creator-Id': sessionStorage.getItem('user_id'),
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: JSON.stringify({
            question1: question1,
            question2: question2,
            question3: question3,
            answer1A: answer1A,
            answer1B: answer1B,
            answer1C: answer1C,
            answer1D: answer1D,
            answer2A: answer2A,
            answer2B: answer2B,
            answer2C: answer2C,
            answer2D: answer2D,
            answer3A: answer3A,
            answer3B: answer3B,
            answer3C: answer3C,
            answer3D: answer3D,
            answerQuestion1: answers1,
            answerQuestion2: answers2,
            answerQuestion3: answers3,
          }),
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        sessionStorage.setItem('task_id', data.id)

        return data.id
      } catch (err) {
        setError('Error !')
        setVisible('')
      }

      return ''
    }

    const create_signature = async () => {
      try {
        const response = await fetch(`${URL}/signature/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Creator-Id': sessionStorage.getItem('user_id'),
            'Task-Id': sessionStorage.getItem('task_id'),
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        sessionStorage.setItem('list_id', data.id)

        return data.id
      } catch (err) {
        setError('Error !')
        setVisible('')
      }

      return ''
    }

    const navigate_qr_code = async () => {
      try {
        const task_id = await create_task()
        const list_id = await create_signature()
        navigate(`/main/qrcode/${task_id}/${list_id}`)
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    navigate_qr_code()
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
      <Card className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        <Title>Soru Oluştur</Title>
        <Text className="pb-2" size="lg">
          Soru 1
        </Text>
        <TextInput
          name="question1"
          placeholder="Soru Kökü 1"
          value={question1}
          onChange={(e) => HandleChange(e)}
        />
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers1"
            value="A"
            onChange={(e) => HandleChange(e)}
            checked={answers1 === 'A'}
          />
          <TextInput
            className="w-full"
            name="answer1A"
            placeholder="A Şıkkı"
            value={answer1A}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers1"
            value="B"
            onChange={(e) => HandleChange(e)}
            checked={answers1 === 'B'}
          />
          <TextInput
            className="w-full"
            name="answer1B"
            placeholder="B Şıkkı"
            value={answer1B}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers1"
            value="C"
            onChange={(e) => HandleChange(e)}
            checked={answers1 === 'C'}
          />
          <TextInput
            className="w-full"
            name="answer1C"
            placeholder="C Şıkkı"
            value={answer1C}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers1"
            value="D"
            onChange={(e) => HandleChange(e)}
            checked={answers1 === 'D'}
          />
          <TextInput
            className="w-full"
            name="answer1D"
            placeholder="D Şıkkı"
            value={answer1D}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <Text className="pb-2" size="lg">
          Soru 2
        </Text>
        <TextInput
          name="question2"
          placeholder="Soru Kökü 2"
          value={question2}
          onChange={(e) => HandleChange(e)}
        />
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers2"
            value="A"
            onChange={(e) => HandleChange(e)}
            checked={answers2 === 'A'}
          />
          <TextInput
            className="w-full"
            name="answer2A"
            placeholder="A Şıkkı"
            value={answer2A}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers2"
            value="B"
            onChange={(e) => HandleChange(e)}
            checked={answers2 === 'B'}
          />
          <TextInput
            className="w-full"
            name="answer2B"
            placeholder="B Şıkkı"
            value={answer2B}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers2"
            value="C"
            onChange={(e) => HandleChange(e)}
            checked={answers2 === 'C'}
          />
          <TextInput
            className="w-full"
            name="answer2C"
            placeholder="C Şıkkı"
            value={answer2C}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers2"
            value="D"
            onChange={(e) => HandleChange(e)}
            checked={answers2 === 'D'}
          />
          <TextInput
            className="w-full"
            name="answer2D"
            placeholder="D Şıkkı"
            value={answer2D}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <Text className="pb-2" size="lg">
          Soru 3
        </Text>
        <TextInput
          name="question3"
          placeholder="Soru Kökü 3"
          value={question3}
          onChange={(e) => HandleChange(e)}
        />
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers3"
            value="A"
            onChange={(e) => HandleChange(e)}
            checked={answers3 === 'A'}
          />
          <TextInput
            className="w-full"
            name="answer3A"
            placeholder="A Şıkkı"
            value={answer3A}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers3"
            value="B"
            onChange={(e) => HandleChange(e)}
            checked={answers3 === 'B'}
          />
          <TextInput
            className="w-full"
            name="answer3B"
            placeholder="B Şıkkı"
            value={answer3B}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers3"
            value="C"
            onChange={(e) => HandleChange(e)}
            checked={answers3 === 'C'}
          />
          <TextInput
            className="w-full"
            name="answer3C"
            placeholder="C Şıkkı"
            value={answer3C}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <div className="flex w-full items-start gap-2 pb-2">
          <RadioButton
            className="self-center"
            name="answers3"
            value="D"
            onChange={(e) => HandleChange(e)}
            checked={answers3 === 'D'}
          />
          <TextInput
            className="w-full"
            name="answer3D"
            placeholder="D Şıkkı"
            value={answer3D}
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <Button onClick={(e) => SubmitQuestions(e)}>Soruları Tamamla</Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default CreateSignaturePage
