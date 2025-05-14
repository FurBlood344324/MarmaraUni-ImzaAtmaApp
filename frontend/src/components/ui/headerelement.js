import React from 'react'

export default function HeaderElement({ className, children, href }) {
  return (
    <li className="relative ml-5">
      <a
        className={`${className} rotate-6 rounded-lg px-1 py-2 font-sans font-medium text-white no-underline duration-300 ease-in-out before:absolute before:bottom-[-5px] before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:transform before:bg-gradient-to-r before:from-[#61dafb] before:to-[#3b9eff] before:duration-300 before:ease-in-out before:content-[''] hover:scale-110 hover:bg-blue-200 hover:bg-opacity-10 hover:text-blue-300 hover:before:origin-left hover:before:scale-x-100`}
        href={href}
      >
        {children}
      </a>
    </li>
  )
}
