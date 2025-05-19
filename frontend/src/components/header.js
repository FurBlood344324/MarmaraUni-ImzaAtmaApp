import HeaderElement from '../components/ui/headerelement'

const Header = ({ className, text, username }) => {
  return (
    <header className={`${className} flex w-full flex-col bg-[#282c34] px-5 shadow-sm`}>
      <nav className="flex items-center justify-between bg-[#282c34] shadow-lg">
        <div className="font-helvetica-cursive text-left text-3xl font-bold text-blue-400">
          {text}
        </div>
        <ul className="m-0 flex list-none gap-5 p-0">
          <HeaderElement href="/logout">{username}</HeaderElement>
        </ul>
      </nav>
    </header>
  )
}

export default Header
