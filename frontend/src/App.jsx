import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RequestForm } from './components/RequestForm';
import { ResponseViewer } from './components/ResponseViewer';
import { HistoryList } from './components/HistoryList';
import { useHistory } from './hooks/useHistory';
import { Box, Container } from '@mui/material';

const queryClient = new QueryClient();

function AppContent() {
  const [response, setResponse] = useState(null);
  const [page, setPage] = useState(1);
  const { data: historyData } = useHistory(page);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <RequestForm onSuccess={setResponse} />
      {response && <ResponseViewer response={response} />}
      {historyData && (
        <HistoryList
          data={historyData.data}
          total={historyData.total}
          page={historyData.page}
          onPageChange={setPage}
        />
      )}
    </Container>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}