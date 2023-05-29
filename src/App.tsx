import { Layout } from "./molecules/Layout/Layout";
import { Report } from "./pages/Report";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Report />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
