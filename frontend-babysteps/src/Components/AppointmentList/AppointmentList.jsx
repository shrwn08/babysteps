import React, { useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment.js for date formatting
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { config } from "../config";

const AppointmentList = ({ appointments, setAppointments }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [updatedPatientName, setUpdatedPatientName] = useState("");
  const [updatedAppointmentType, setUpdatedAppointmentType] = useState("");

  const handleCancel = async (id) => {
    try {
      await axios.delete(`https://babysteps-backend-noit.onrender.com/appointments/${id}`);
      setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
    } catch (error) {
      console.error("Failed to cancel appointment", error);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdatedPatientName(appointment.patientName);
    setUpdatedAppointmentType(appointment.appointmentType);
    setEditDialog(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedAppointment) return;

    const updatedAppointment = {
      ...selectedAppointment,
      patientName: updatedPatientName,
      appointmentType: updatedAppointmentType,
    };


    try {
      const response = await axios.put(
        `https://babysteps-backend-noit.onrender.com/appointments/${selectedAppointment._id}`,
        updatedAppointment
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === selectedAppointment._id ? response.data : appt
        )
      );

      setEditDialog(false);
    } catch (error) {
      console.error("Failed to update appointment", error);
    }
  };



  return (
    <Paper style={{ padding: "16px", marginTop: "20px" }}>
      <Typography variant="h6">Upcoming Appointments</Typography>
      <List>
        {appointments.map((appointment) => {

          {/* console.log(appointment.date) */}

          const dateString = appointment.date.toString();
          const date = dateString.substring(0,10);

          {/* const startTime = dateString.substring(11,16)

          const endTime = parseInt(dateString.substring(11,13)) + 1; */}
          
        
          return (
          <ListItem key={appointment._id}>
            <ListItemText
              primary={`${appointment.patientName} - ${date} `} 
              secondary={appointment.appointmentType}
            />
            {/* <ListItemText
  primary={`${appointment.patientName} - ${moment(appointment.date).format("YYYY-MM-DD HH:mm")}`} 
  secondary={appointment.appointmentType}
/> */}

            <Box sx={{ display : "flex ", justifyContent: "space-between", alignItems : "center", gap : "2rem"}}>
            <Button variant="contained" color="primary" onClick={() => handleEdit(appointment)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleCancel(appointment._id)}>
              Cancel
            </Button>
            </Box>
          </ListItem>
        )})}
      </List>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Patient Name"
            fullWidth
            value={updatedPatientName}
            onChange={(e) => setUpdatedPatientName(e.target.value)}
            margin="dense"
          />
          <TextField
            select
            label="Appointment Type"
            fullWidth
            value={updatedAppointmentType}
            onChange={(e) => setUpdatedAppointmentType(e.target.value)}
            margin="dense"
          >
            <MenuItem value="Routine Check-Up">Routine Check-Up</MenuItem>
            <MenuItem value="Ultrasound">Ultrasound</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AppointmentList;
