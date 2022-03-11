import "./Home.css";
import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { Link } from "react-router-dom";
import moment from 'moment';

var Buffer = require('buffer/').Buffer
function Home() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [photoBase64, setPhotoBase64] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();
    const POST_URL = "http://localhost:8080/appointment";
    try {
      let res = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          mobileNumber: mobileNumber,
          address: address,
          birthday: moment(birthday).format("MM/DD/yyyy"),
          appointmentDate: moment(appointmentDate).format("MM/DD/yyyy"),
          photobase64: photoBase64
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function onPhotoImageChange(e) {

    let photoURL = URL.createObjectURL(e.target.files[0]);
    // convert photo image file to base64 string
    Axios.get(photoURL, {responseType: 'arraybuffer'}).then(res =>{
      let rawBase64 = Buffer.from(res.data).toString("base64");
      setPhotoBase64(rawBase64);
    });
  }
  return (
    <div className="Home">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <DatePicker
          selected={birthday}
          onChange={(date) => setBirthday(date)}
        />
        <DatePicker
          dateFormat="MM/dd/yyyy"
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
        />
        <input type="file" accept="image/*" onChange={onPhotoImageChange} />
        <button type="submit">Create</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default Home;