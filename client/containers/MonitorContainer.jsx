import React from 'react';
import { Box, Card, Chip, Container, Button, Divider, Stack, Typography } from '@mui/material';
import CustomRangesMonitor from '../components/monitors/CustomRangesMonitor';
import AddCircleIcon from "@mui/icons-material/AddCircle";


const MonitorContainer = () => {
const handleClick = () => console.log('this is handleclick');
const handleDelete = () => console.log('this is handledelete');




    return (
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Card
            variant="outlined"
            sx={{
              width: "50vw",
              display: "flex",
              flexDirection: "column",
              //   alignItems: "center",
              justifyContent: "center",
              padding: 3,
              boxShadow: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 4, //transparent
            }}
          >
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="h5" color="white">
                  Your Monitors
                </Typography>
                {/* create mew monitor button */}
                <Button variant="contained" size="small">
                  CREATE NEW MONITOR
                </Button>
              </Stack>
            </Box>
            <Divider variant="middle" style={{ width: "100%" }} />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2" color="white">
                default monitors
              </Typography>
              {/* array of buttons to edit monitor */}
              <Stack
                direction="column"
                spacing={1}
                alignItems="center"
                justifyContent="left"
              >
                <Chip
                  color="primary"
                  label="Freshness"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
                <Chip
                  label="Volume"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
                <Chip
                  label="Schema"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
                <Chip
                  label="Range"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
              </Stack>

              <Typography gutterBottom variant="body2" color="white">
                custom monitors
              </Typography>
              {/* array of buttons to edit monitor */}
              <Stack
                direction="column"
                spacing={1}
                alignItems="center"
                justifyContent="left"
              >
                <Chip
                  color="primary"
                  label="custom 1"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
                <Chip
                  label="custom 2"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
                <Chip
                  label="custom 3"
                  size="small"
                  onClick={handleClick}
                  deleteIcon={<AddCircleIcon color="primary" />}
                />
              </Stack>
            </Box>
            <CustomRangesMonitor />
          </Card>
        </Box>
      </div>
    );

}



export default MonitorContainer;