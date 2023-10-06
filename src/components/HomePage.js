import React from 'react'
import Navbar from "@/components/Navbar"

const HomePage = () => {
  return (
    <>
      <div className="h-screen w-screen" style={{ backgroundImage: "url(/Images/acropolis.jpg)", backgroundPosition: "center", objectFit: "cover", backgroundSize: "cover" }}>
        <Navbar/>
      </div>
    </>
  )
}

export default HomePage