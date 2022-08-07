import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import FlagIcon from '@mui/icons-material/Flag';

export default function BasicAlerts() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100%' }}>
        <Alert icon={<FlagIcon fontSize="inherit" />} severity="warning">
          TestingSpace is a <b>development environment.</b> Expect broken things!
        </Alert>
    </Box>
  );
}