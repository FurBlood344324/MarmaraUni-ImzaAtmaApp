import Footer from './footer'
import Header from './header'

const Layout = ({ children, username }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header className="sticky top-0 py-2" text="ImzaAtmaApp" username={username} />

      <main className="flex flex-1 items-center justify-center px-4 py-4">{children}</main>

      <Footer className="w-full py-1" />
    </div>
  )
}

export default Layout
