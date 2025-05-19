import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../config.js'
import Text from '../components/ui/text'
import RadioButton from '../components/ui/radiobutton'
import Title from '../components/ui/title'
import Button from '../components/ui/button'

const PushSignaturePage = () => {
  const navigate = useNavigate()
  const { taskid, listid } = useParams()
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [selectedAnswer1, setSelectedAnswer1] = useState('')
  const [selectedAnswer2, setSelectedAnswer2] = useState('')
  const [selectedAnswer3, setSelectedAnswer3] = useState('')
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
      case 'selected1':
        setSelectedAnswer1(value)
        break
      case 'selected2':
        setSelectedAnswer2(value)
        break
      case 'selected3':
        setSelectedAnswer3(value)
        break
      default:
        break
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

    const gettask = async () => {
      try {
        const response = await fetch(`${URL}/task/gettaskbytaskid`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Task-Id': `${taskid}`,
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        return data
      } catch (err) {
        setError('Error !')
        setVisible('')
      }

      return ''
    }

    const set_page = async () => {
      const task = await gettask()

      setQuestion1(task.question1)
      setQuestion2(task.question2)
      setQuestion3(task.question3)
      setAnswer1A(task.answer1A)
      setAnswer1B(task.answer1B)
      setAnswer1C(task.answer1C)
      setAnswer1D(task.answer1D)
      setAnswer2A(task.answer2A)
      setAnswer2B(task.answer2B)
      setAnswer2C(task.answer2C)
      setAnswer2D(task.answer2D)
      setAnswer3A(task.answer3A)
      setAnswer3B(task.answer3B)
      setAnswer3C(task.answer3C)
      setAnswer3D(task.answer3D)
    }

    set_page()

    if (sessionStorage.getItem('user_id') === null) {
      fetchUserId()
    }
  }, [navigate, taskid])

  const HandlePush = () => {
    const check_task = async () => {
      try {
        const response = await fetch(`${URL}/task/${taskid}/checktask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`,
          },
          body: JSON.stringify({
            answer1: selectedAnswer1,
            answer2: selectedAnswer1,
            answer3: selectedAnswer1,
          }),
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        return data.message === 'true'
      } catch (err) {
        setError('Hatalı Cevap Verdiniz !')
        setVisible('')
      }

      return false
    }

    const push_signature = async () => {
      try {
        const response = await fetch(`${URL}/signature/push`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Creator-Id': sessionStorage.getItem('user_id'),
            'List-Id': `${listid}`,
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    const push = async () => {
      if (await check_task()) {
        await push_signature()
        navigate('/main')
      }
    }

    push()
  }

  return (
    <Layout username="Hesabım">
      <Card className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        <Title>İmza Atma Sayfası</Title>
        <Text className="w-full break-words pb-3" size="lg">
          {question1}
        </Text>
        <div className="flex w-full flex-col pb-4">
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected1"
              value="A"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer1 === 'A'}
            />
            <Text>{'A)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer1A}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected1"
              value="B"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer1 === 'B'}
            />
            <Text>{'B)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer1B}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected1"
              value="C"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer1 === 'C'}
            />
            <Text>{'C)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer1C}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected1"
              value="D"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer1 === 'D'}
            />
            <Text>{'D)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer1D}</Text>
          </div>
        </div>
        <Text className="w-full break-words pb-3" size="lg">
          {question2}
        </Text>
        <div className="flex w-full flex-col pb-4">
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected2"
              value="A"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer2 === 'A'}
            />
            <Text>{'A)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer2A}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected2"
              value="B"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer2 === 'B'}
            />
            <Text>{'B)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer2B}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected2"
              value="C"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer2 === 'C'}
            />
            <Text>{'C)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer2C}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected2"
              value="D"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer2 === 'D'}
            />
            <Text>{'D)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer2D}</Text>
          </div>
        </div>
        <Text className="w-full break-words pb-3" size="lg">
          {question3}
        </Text>
        <div className="flex w-full flex-col pb-4">
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected3"
              value="A"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer3 === 'A'}
            />
            <Text>{'A)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer3A}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected3"
              value="B"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer3 === 'B'}
            />
            <Text>{'B)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer3B}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected3"
              value="C"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer3 === 'C'}
            />
            <Text>{'C)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer3C}</Text>
          </div>
          <div className="flex w-full items-start gap-2 pb-2">
            <RadioButton
              className="self-center"
              name="selected3"
              value="D"
              onChange={(e) => HandleChange(e)}
              checked={selectedAnswer3 === 'D'}
            />
            <Text>{'D)'}</Text>
            <Text className="w-0 flex-1 break-words">{answer3D}</Text>
          </div>
        </div>
        <Button onClick={() => HandlePush()}>Cevapları Gönder</Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default PushSignaturePage
