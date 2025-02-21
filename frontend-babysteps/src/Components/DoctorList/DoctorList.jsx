import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const DoctorList = ({ doctors, onSelectDoctor }) => {
  return (
    <Paper style={{ padding: "16px", marginBottom: "20px" }}>
      <Typography variant="h6">Select a Doctor</Typography>
      <List>
        {doctors.map((doctor, index) => { 
          const evenIndex = index % 2 === 0;
          return(
          <ListItem button key={doctor._id} onClick={() => onSelectDoctor(doctor)} sx={{
            backgroundColor : `${evenIndex? '#B2A5FF' : '#DAD2FF'}`
          }}>
            <ListItemText primary={`${doctor.name} (${doctor.specialization})`} />
          </ListItem>
        )})}
      </List>
    </Paper>
  );
};

export default DoctorList;
