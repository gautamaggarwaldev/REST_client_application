import { Paper, Typography, Box } from '@mui/material';

export const ResponseViewer = ({ response }) => {
  if (!response) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Response
      </Typography>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Status: {response.status}
        </Typography>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          {JSON.stringify(response.data, null, 2)}
        </pre>
      </Box>
    </Paper>
  );
};