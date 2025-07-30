/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useMakeRequest } from '../hooks/useRequest';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from '@mui/material';
import { HttpMethod } from '../constants';

export const RequestForm = ({ onSuccess }) => {
  const [method, setMethod] = useState(HttpMethod.GET);
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{"Content-Type": "application/json"}');
  const [body, setBody] = useState('{}');
  const { mutate, isLoading } = useMakeRequest();

  const handleSubmit = (e) => {
    e.preventDefault();
    let parsedHeaders = {};
    let parsedBody = null;

    try {
      parsedHeaders = JSON.parse(headers);
      if (method !== HttpMethod.GET) {
        parsedBody = JSON.parse(body);
      }
    } catch (error) {
      alert('Invalid JSON in headers or body');
      return;
    }

    mutate(
      { method, url, headers: parsedHeaders, body: parsedBody },
      {
        onSuccess: (data) => {
          onSuccess(data);
        },
      }
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Make a Request
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="method-label">Method</InputLabel>
          <Select
            labelId="method-label"
            value={method}
            label="Method"
            onChange={(e) => setMethod(e.target.value)}
          >
            {Object.values(HttpMethod).map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Headers (JSON)"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          multiline
          rows={3}
        />

        {method !== HttpMethod.GET && (
          <TextField
            fullWidth
            margin="normal"
            label="Body (JSON)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={5}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </Button>
      </Box>
    </Paper>
  );
};