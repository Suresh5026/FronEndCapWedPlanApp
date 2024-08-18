import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
export default function Mybookings() {
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
    "Action",
  ];
  const [booking, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://backendcapwedplanappevent.onrender.com/bookings/get-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, []);

  const handleCancel = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) {
        return;
      }
      await axios.put(
        `https://backendcapwedplanappevent.onrender.com/bookings/cancel-booking/${id}`,
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
  const handleOpenRazorpay = (data, userId, bookingId) => {
    const options = {
      key: "rzp_test_tGoWeh9ybvAQtC",
      amount: Number(data.amount),
      currency: "INR",
      name: "Doctor Appointment App",
      order_id: data.id,
      notes: {
        userId: userId,
        bookingId: bookingId,
      },
      handler: function (response) {
        axios
          .post("https://backendcapwedplanappevent.onrender.com/payment/verify", {
            response: response,
            bookingId: bookingId,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount, userId, bookingId) => {
    const data = {
      amount: amount,
      userId: userId,
      bookingId: bookingId,
    };
    axios
      .post("https://backendcapwedplanappevent.onrender.com/payment/orders", data)
      .then((res) => {
        console.log(res.data.data);
        handleOpenRazorpay(res.data.data, userId, bookingId);
      })
      .catch((err) => console.log(err));
  };

  return (
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
                {item.status !== "cancelled" &&
                  item.paymentStatus === "Pending" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel Booking
                    </Button>
                  )}
                {item.paymentStatus === "Paid" ? (
                  "Paid"
                ) : item.status !== "cancelled" &&
                  item.paymentStatus !== "Paid" ? (
                  <Button
                    variant="success"
                    onClick={() =>
                      handlePayment(item.eventPrice, item.userId, item._id)
                    }
                  >
                    Pay Now
                  </Button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
