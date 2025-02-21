import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Paper, Typography } from "@mui/material";
import { config } from "../config";

const AppointmentForm = ({ doctor, setAppointments }) => {
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (doctor && date) {
      axios
        .get(`https://babysteps-backend-noit.onrender.com/doctors/${doctor._id}/slots?date=${date}`)
        .then((response) => {
          setAvailableSlots(response.data);
        })
        .catch((error) => console.error("Error fetching slots", error));
    }
  }, [doctor, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAppointment = {
      doctorId: doctor._id,
      date,
      duration: 60, 
      appointmentType,
      patientName,
      notes,

    

    };
    // console.log(selectedSlot)

    try {
      const response = await axios.post(`https://babysteps-backend-noit.onrender.com/appointments`, newAppointment);

      setAppointments((prev) => [...prev, response.data]);
      setDate("");
      setAvailableSlots([]);
      setSelectedSlot("");
      setAppointmentType("");
      setPatientName("");
      setNotes("");
    } catch (error) {
      alert("Failed to book appointment", error);
    }
  };

  return (
    <Paper style={{ padding: "16px", marginBottom: "20px" }}>
      <Typography variant="h6">Book an Appointment with {doctor.name}</Typography>
      <form onSubmit={handleSubmit} className="mt-5 flex  flex-col gap-5">
        <TextField type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} required />
        
        <TextField
          select
          fullWidth
          label="Available Slots"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <MenuItem key={index} value={slot}>
                {slot.start}-{slot.end}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No slots available</MenuItem>
          )}
        </TextField>

        <TextField
          select
          fullWidth
          label="Appointment Type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          required
        >
          <MenuItem value="Routine Check-Up">Routine Check-Up</MenuItem>
          <MenuItem value="Ultrasound">Ultrasound</MenuItem>
          <MenuItem value="Consultation">Consultation</MenuItem>
        </TextField>

        <TextField fullWidth label="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        <TextField fullWidth label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <Button type="submit" variant="contained" color="primary">
          Book Appointment
        </Button>
      </form>
    </Paper>
  );
};

export default AppointmentForm;
