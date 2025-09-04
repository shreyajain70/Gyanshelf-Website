import { createRoot } from 'react-dom/client'
import { Header } from './Components/Pages/Header'
import { Footer } from './Components/Pages/Footer'
import { FullRouter } from './Components/Router'
import { Outlet } from 'react-router-dom'




export const Main = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}


const Root = createRoot(document.getElementById("root"))
Root.render(<FullRouter></FullRouter>)