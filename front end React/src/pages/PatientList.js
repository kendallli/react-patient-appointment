import { useState, useEffect} from "react";
import axios from 'axios';
import "./PatientList.css";
var Buffer = require('buffer/').Buffer
function PatientList() {
  const [patientList, setPatientList] = useState([]);

  const GET_URL = "http://localhost:8080/patients";
  // load the patient data after the page is rendered
  useEffect(() => {
    fetchPatients();
  }, []);
  const fetchPatients = () => {
  axios
    .get(GET_URL)
    .then((res) => {
      setPatientList(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="Patients">
      Patient List
      <ul>
      <div className='item-container'>
        {patientList.map((patient) => (
          <div className='card'>
          <div className='photo'>{patient.PhotoBase64 ? <img src={`data:image/png;base64,${patient.PhotoBase64}`}/>: ''}
          </div>
          <h3>{patient.name}</h3>
          <p>Email: {patient.email}</p>
          <p>Mobile Number: {patient.mobileNumber}</p>
          <p>Address: {patient.address}</p>
          <p>Birthday: {patient.birthday}</p>
          <p>Appointment Date: {patient.appointmentDate}</p>
        </div>
        ))}
      </div>
      </ul>
    </div>
  );
}

export default PatientList;