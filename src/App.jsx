import { Routes, Route } from "react-router-dom";
import Home from "./assets/Components/Pages/Protected/Home";
import Login from "./assets/Components/Auth/Login";
import Register from "./assets/Components/Auth/Register";
import Profile from "./assets/Components/Pages/Protected/Profile";
import Privatelayout from "./assets/Layouts/Privatelayout";
import Publiclayout from "./assets/Layouts/Publiclayout";
import Navbar from "./assets/Components/Pages/Protected/Navbars";
import Budget from "./assets/Components/Pages/Protected/Budjet";
import Event from "./assets/Components/Pages/EventPages/Event";
import Createevent from "./assets/Components/Pages/EventPages/Createevent";
import { EventProvider } from "./assets/Context/Eventcontext";
import Vendors from "./assets/Components/Pages/EventPages/Vendors/Vendor";
import Mybookings from "./assets/Components/Pages/EventPages/Vendors/Mybookings";
import Editevent from "./assets/Components/Pages/EventPages/Editevent";
import Decorations from "./assets/Components/Pages/Decorate/Decorations";
import Deco from "./assets/Components/Pages/Decorate/Deco";
import Createdeco from "./assets/Components/Pages/Decorate/Createdeco";
import { DecoProvider } from "./assets/Context/Decocontext";
import Editdecoration from "./assets/Components/Pages/Decorate/Editdecoration";
import Planning from "./assets/Components/Pages/EventPages/Planning";
import { PlanProvider } from "./assets/Context/Plancontex";

function App() {
  return (
    <>
      <PlanProvider>
        <DecoProvider>
          <EventProvider>
            <div>
              <Navbar />
            </div>
            <Routes>
              <Route Component={Home} path="/" />
              <Route
                path="/login"
                element={
                  <Publiclayout>
                    <Login />
                  </Publiclayout>
                }
              />
              <Route
                path="/register"
                element={
                  <Publiclayout>
                    <Register />
                  </Publiclayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Privatelayout>
                    <Profile />
                  </Privatelayout>
                }
              />
              <Route
                path="/bookings"
                element={
                  <Privatelayout>
                    <Mybookings />
                  </Privatelayout>
                }
              />
              <Route
                path="/events"
                element={
                  <Privatelayout>
                    <Event />
                  </Privatelayout>
                }
              />
              <Route
                path="/decorate"
                element={
                  <Privatelayout>
                    <Deco />
                  </Privatelayout>
                }
              />
              <Route
                path="/decorate/create-decoration"
                element={
                  <Privatelayout>
                    <Createdeco />
                  </Privatelayout>
                }
              />
              <Route
                path="/decorate/edit-decoration/:id"
                element={
                  <Privatelayout>
                    <Editdecoration />
                  </Privatelayout>
                }
              />
              <Route
                path="/decorations"
                element={
                  <Privatelayout>
                    <Decorations />
                  </Privatelayout>
                }
              />
              <Route
                path="/events/create"
                element={
                  <Privatelayout>
                    <Createevent />
                  </Privatelayout>
                }
              />
              <Route
                path="/events/edit/:id"
                element={
                  <Privatelayout>
                    <Editevent />
                  </Privatelayout>
                }
              />
              <Route Component={Budget} path="/budget" />
              <Route Component={Vendors} path="/vendors" />
              <Route Component={Planning} path="/planning" />
            </Routes>
          </EventProvider>
        </DecoProvider>
      </PlanProvider>
    </>
  );
}

export default App;
