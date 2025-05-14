import Layout from '../components/layout'
import Button from '../components/ui/button'
import Card from '../components/ui/card'

const LoginnedMainPage = () => {
  return (
    <Layout username="">
      <Card>
        <Button classNameIn="w-full pr-0" size="lg">
          Imza At
        </Button>
        <Button classNameIn="w-full pr-0.75" size="lg">
          Imza Olustur
        </Button>
      </Card>
    </Layout>
  )
}

export default LoginnedMainPage
