import Layout from '../components/layout'
import Card from '../components/ui/card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { URL } from '../config.js'
import Title from '../components/ui/title'
import Button from '../components/ui/button'
import Text from '../components/ui/text'

const LookUpListPage = () => {
  const navigate = useNavigate()
  const { listid } = useParams()
  const [visible, setVisible] = useState('hidden')
  const [error, setError] = useState('Error')
  const [signatures, setSignatures] = useState([])
  const [results, setResults] = useState([])
  const isInitialRender = useRef(true)

  const HandleDownload = () => {
    if (!results || results.length === 0) {
      alert('İndirilecek veri bulunamadı.')
      return
    }

    const jsonData = JSON.stringify(results, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `yoklama_${listid}.json`
    a.click()

    window.URL.revokeObjectURL(url)
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

    const get_signatures = async () => {
      try {
        const response = await fetch(`${URL}/signature/getsignatures`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'List-Id': `${listid}`,
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Fetch error')

        setSignatures(data)
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    get_signatures()
  }, [listid, navigate])

  useEffect(() => {
    const fetchData = async () => {
      if (isInitialRender.current) {
        isInitialRender.current = false
        return
      }

      try {
        const resultsArray = []

        for (const signature of signatures) {
          const response = await fetch(`${URL}/auth/getnameandno`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Creator-Id': `${signature.creator_id}`,
              Authorization: `Bearer ${getCookie('token')}`,
            },
          })

          const data = await response.json()

          if (!response.ok) throw new Error(data.message || 'Fetch error')

          if (!resultsArray.some((item) => item.no === data.no)) {
            resultsArray.push(data)
          }
        }

        setResults(resultsArray)
      } catch (err) {
        setError('Error !')
        setVisible('')
      }
    }

    fetchData()
  }, [signatures])

  return (
    <Layout username="Hesabım">
      <Card className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
        <div className="flex justify-between">
          <div>
            <Title weight="bold">Ad Soyad</Title>
          </div>
          <div>
            <Title weight="bold">Numara</Title>
          </div>
        </div>
        {results.map((item, index) => (
          <div key={index} className="flex justify-between border-b border-gray-200 py-2">
            <div>{item.name}</div>
            <div>{item.no}</div>
          </div>
        ))}
        <Button
          onClick={() => HandleDownload()}
          classNameOut="flex justify-center pt-4"
          classNameIn="w-[30%]"
        >
          Yoklamayı İndir
        </Button>
        <Text className={`${visible} text-red-500`}>{error}</Text>
      </Card>
    </Layout>
  )
}

export default LookUpListPage
