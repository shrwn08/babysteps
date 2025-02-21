import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorList from "./Components/DoctorList/DoctorList";
import AppointmentForm from "./Components/AppointmentForm/AppointmentForm";
import AppointmentList from "./Components/AppointmentList/AppointmentList";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { config } from "./Components/config";
import "./App.css";

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const doctorRes = await axios.get(`https://babysteps-backend-noit.onrender.com/doctors`);
        console.log(doctorRes.data)
        setDoctors(doctorRes.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorsData();
  }, []);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const appointmentRes = await axios.get(`https://babysteps-backend-noit.onrender.com/appointments`);
        setAppointments(appointmentRes.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentsData();
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  console.log(doctors)

  return (
    <Box sx={{width : "98.5vw",
    minHeight : "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#FFF2AF"}}>
    <Container sx={{}}>
      <Typography variant="h4" gutterBottom sx={{fontSize : "3rem", fontWeight : "bold"}}>
        Doctor Appointment Booking
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <DoctorList doctors={doctors} onSelectDoctor={handleDoctorSelect} />
      )}
      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          setAppointments={setAppointments}
        />
      )}
      <AppointmentList
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </Container>
    </Box>
  );
};

export default App;
