import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
export default function Mybookings(){
    const columHeadings = [
        "S.No",
        "User Name",
        "Email ID",
        "Contact Number",
        "Event Name",
        "Event Price",
        "Event From Date",
        "Event To Date",
        "Guests Count",
        "Status"
    ]    
    const [booking, setBookings] = useState([]);
    useEffect(()=>{
        const token = Cookies.get("token");
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings/get-bookings",
          {
            withCredentials: true,
          }
        );
        const bookingData = response.data.data;
        setBookings(bookingData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchBookings();
    }

    },[])

    return(
        <Container>
      <div className="d-flex justify-content-between p-1">
        <h1>My Bookings</h1>
        
      </div>

      <Table responsive>
        <thead>
          <tr>
            {columHeadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {booking.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.eventName}</td>
              <td>{item.eventPrice}</td>
              <td>{item.fromDate}</td>
              <td>{item.toDate}</td>
              <td>{item.guests}</td>
              <td>{item.status}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

    )
}