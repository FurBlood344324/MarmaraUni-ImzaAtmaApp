import Footer from './footer'
import Header from './header'

const Layout = ({ children, username }) => {
  return (
    <div className="flex h-full flex-col justify-end">
      <Header className="sticky top-0 py-2" text="ImzaAtmaApp" username={username} />
      <main className="flex justify-center px-4 pb-[600px] pt-[200px]">{children}</main>
      <div className="bottom-0 w-full">
        <Footer className="bottom-0 mx-auto flex w-full items-center py-1" />
      </div>
    </div>
  )
}

export default Layout
