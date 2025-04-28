import React, { useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  function handleClick() {
    console.log('Istek atiliyor...')
    fetch('http://127.0.0.1:5000/api')
      .then((response) => {
        console.log('Istek başarili!', response)
        return response.json()
      })
      .then((data) => {
        console.log('Veri geldi:', data)
        setData(data)
      })
      .catch((error) => console.error('Hata:', error))
  }

  return (
    <div>
      <button onClick={handleClick}>Get Data</button>
      {data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}
    </div>
  )
}

export default App
