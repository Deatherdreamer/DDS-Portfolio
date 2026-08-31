import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { ThemeProvider } from '@/context'
import { Layout } from '@/components/layout'
import { HomePage } from '@/pages'

export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout>
          <HomePage />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App