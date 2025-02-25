/* eslint-disable sonarjs/no-duplicate-string */
import { queryOptions } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';

import { queryClient } from '@/util/query';

import { apiRequest } from '../core';

export * from './create';

export const getCanBootstrap = () =>
    queryOptions({
        queryKey: ['can-bootstrap'],
        queryFn: async () => {
            const response = await apiRequest('/auth/bootstrap', 'get', {});

            return response.data;
        },
        // If the user can bootstrap, we want to cache the result for 5 seconds
        // Otherwise, we want to cache the result for 24 hours
        staleTime(query) {
            if (query.state.data?.can_bootstrap) {
                console.log('caching for 5 seconds');

                return 1000 * 5;
            }

            return 1000 * 60 * 60 * 24;
        },
    });

export const bootstrapPreflight = async (pathname: string) => {
    const { can_bootstrap } = await queryClient.ensureQueryData(
        getCanBootstrap()
    );

    if (can_bootstrap && !['/bootstrap', '/debug'].includes(pathname)) {
        throw redirect({ to: '/bootstrap' });
    }

    if (!can_bootstrap && ['/bootstrap', '/debug'].includes(pathname)) {
        throw redirect({ to: '/' });
    }
};
