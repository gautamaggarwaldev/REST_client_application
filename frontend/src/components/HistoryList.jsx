import { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export const HistoryList = ({ data, total, page, onPageChange }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Request History
      </Typography>
      <List>
        {data.map((item) => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={`${item.method} ${item.url}`}
                secondary={`Status: ${item.statusCode} - ${new Date(
                  item.createdAt
                ).toLocaleString()}`}
              />
              <IconButton onClick={() => handleExpand(item.id)}>
                {expandedId === item.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={expandedId === item.id} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, pr: 4, pb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Request Headers:
                </Typography>
                <pre style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '16px', 
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(item.headers, null, 2)}
                </pre>

                {item.body && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Request Body:
                    </Typography>
                    <pre style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '16px', 
                      borderRadius: '4px',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(item.body, null, 2)}
                    </pre>
                  </>
                )}

                <Typography variant="subtitle2" gutterBottom>
                  Response:
                </Typography>
                <pre style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '16px', 
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(item.response, null, 2)}
                </pre>
              </Box>
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          variant="outlined"
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {page} of {Math.ceil(total / 10)}
        </Typography>
        <Button
          disabled={page >= Math.ceil(total / 10)}
          onClick={() => onPageChange(page + 1)}
          variant="outlined"
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};