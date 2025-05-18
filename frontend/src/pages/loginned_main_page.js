import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout'
import Button from '../components/ui/button'
import Card from '../components/ui/card'

const LoginnedMainPage = () => {
  const navigate = useNavigate()

  const handlePushSignature = () => {
    navigate('/main/signature/push')
  }

  const handleCreatSignature = () => {
    navigate('/main/signature/create')
  }

  return (
    <Layout username="">
      <Card>
        <Button classNameIn="w-full pr-0" size="lg" onClick={handlePushSignature}>
          İmza At
        </Button>
        <Button classNameIn="w-full pr-0.75" size="lg" onClick={handleCreatSignature}>
          İmza Oluştur
        </Button>
      </Card>
    </Layout>
  )
}

export default LoginnedMainPage
