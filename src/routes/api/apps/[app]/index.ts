import { FastifyPluginAsync } from 'fastify';
import { generateSunflake } from 'sunflake';

import { DB } from '../../../../database';
import { AppEntryDeleteRoute } from './delete';
import { AppDeploysRoute } from './deploys';
import { AppEntryLinkRoute } from './link';

export const generateSnowflake = generateSunflake();

export type AppIDParameters = {
    Params: {
        app_id: string;
    };
};
export const AppEntryRoute: FastifyPluginAsync = async (router, _options) => {
    router.get<AppIDParameters>('/', async (_request, reply) => {
        const parameters = _request.params;

        ///TODO: Permission Verification
        const app = await DB.selectOneFrom('applications', '*', {
            app_id: parameters.app_id,
        });

        reply.send(app);
    });

    router.register(AppEntryLinkRoute, { prefix: '/link' });

    router.register(AppDeploysRoute, { prefix: '/deploys' });

    router.register(AppEntryDeleteRoute, { prefix: '/delete' });
};
