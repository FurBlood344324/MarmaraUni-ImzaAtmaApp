const Footer = ({ className }) => {
  return (
    <footer className={`${className} bg-gray-800 text-white`}>
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="text-lg font-semibold">ImzaAtmaApp</div>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <a href="" className="hover:text-gray-300">
            Hakkımızda
          </a>
          <a href="" className="hover:text-gray-300">
            İletişim
          </a>
          <a href="" className="hover:text-gray-300">
            Gizlilik
          </a>
        </div>

        {/* Sağ: Telif hakkı */}
        <div className="mt-4 text-sm md:mt-0">&copy; 2025 ImzaAtmaApp</div>
      </div>
    </footer>
  )
}

export default Footer
