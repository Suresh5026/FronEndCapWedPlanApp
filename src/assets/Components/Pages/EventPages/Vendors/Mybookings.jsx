import { useEffect, useState } from "react"
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
        "Status",
        "Cancel Request"
    ]    
    const [booking, setBookings] = useState([]);
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/bookings/get-bookings",
          {
            headers: {
              'Authorization': `Bearer ${token}`
          },
          
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

    const handleCancel = async (id) => {
      const token = localStorage.getItem("token");
      try {

      const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirmCancel) {
        return; // Exit if user does not confirm
      }
        await axios.put(
          `http://localhost:8000/bookings/cancel-booking/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "cancelled" } : booking
          )
        );
      } catch (error) {
        console.log("Error cancelling booking:", error);
      }
    };

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
              <td>
              {item.status !== "cancelled" && (
                  <Button variant="danger" onClick={() => handleCancel(item._id)}>
                    Cancel Booking
                  </Button>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

    )
}