import { Routes, Route } from 'react-router-dom'
import Home from './assets/Components/Pages/Home'
import Login from './assets/Components/Auth/Login'
import Register from './assets/Components/Auth/Register'
import Profile from './assets/Components/Pages/Protected/Profile'
import Privatelayout from './assets/Layouts/Privatelayout'
import Publiclayout from './assets/Layouts/Publiclayout'
import Navbar from './assets/Components/Navbars'
import Budget from './assets/Components/Pages/Budjet'
import Event from './assets/Components/Pages/EventPages/Event'
import Createevent from './assets/Components/Pages/EventPages/Createevent'
// import Editevent from './assets/Components/Pages/EventPages/Editevent'
import { EventProvider } from './assets/Context/Eventcontext'
import Vendors from './assets/Components/Pages/Vendors/Vendor'
import Mybookings from './assets/Components/Pages/Vendors/Mybookings'
// import Reqform from './assets/Components/Pages/Vendors/Reqform'

function App() {
  

  return (
    <>
    <EventProvider>
    <div>
      <Navbar />
    </div>
      <Routes>
        <Route Component={Home} path='/' />
        <Route path='/login' element={
          <Publiclayout>
            <Login />
          </Publiclayout>
        } />
        <Route path='/register' element={
          <Publiclayout>
            <Register />
          </Publiclayout> }/>
        <Route path='/profile' element={
          <Privatelayout>
            <Profile />
          </Privatelayout>
        }/>
        <Route path='/bookings' element={
          <Privatelayout>
            <Mybookings />
          </Privatelayout> }/>
        <Route path='/events' element={
          <Privatelayout>
            <Event />
          </Privatelayout>
        }/>
        <Route path='/events/create' element={
          <Privatelayout>
            <Createevent />
          </Privatelayout>
        }/>
        <Route path='/events/edit/:id' element={
          <Privatelayout>
            <Createevent />
          </Privatelayout>
        }/>
        <Route Component={Budget} path='/budget' />
        <Route Component={Vendors} path='/vendors' />
        
      </Routes>
    
    </EventProvider>
    </>
  )
}

export default App
