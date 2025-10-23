'use client';

import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
    children: ReactNode;
    dehydratedState?: DehydratedState | null;
}

export default function ReactQueryProvider({ children, dehydratedState }: Props) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            },
        },
    }));

    useEffect(() => {
        console.log('ReactQueryProvider: dehydratedState present?', !!dehydratedState);
        console.log('QueryClient cache keys:', queryClient.getQueryCache().getAll().map(q => q.queryKey));
    }, [dehydratedState, queryClient]);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}