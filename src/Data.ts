import { ScylloClient } from 'scyllo';

import { AuthKey } from './types/AuthKey.type';
import { Owner } from './types/Owner.type';
import { Site } from './types/Site.type';
import { log } from './util/logging';

export const DB = new ScylloClient<{
    // Get a list of all the owners by OwnerID
    owners: Owner;
    // Get a list of all the sites
    sites: Site;
    // Get authorization
    keys: AuthKey;
}>({
    client: {
        contactPoints: [process.env.DB_IP || 'localhost:9042'],
        localDataCenter: process.env.DB_DATACENTER || 'datacenter1',
        keyspace: 'system',
    },
    debug: false,
});

export const initDB = async () => {
    log.database('Awaiting Connection');
    await DB.awaitConnection();

    await DB.useKeyspace('ipfssignal', true);

    log.database('Ensuring Tables');
    await DB.createTable(
        'owners',
        true,
        {
            user_id: {
                type: 'bigint',
            },
        },
        'user_id'
    );
    await DB.createTable(
        'sites',
        true,
        {
            host: { type: 'text' },
            owner: { type: 'bigint' },
            site_id: { type: 'bigint' },
            cid: { type: 'text' },
        },
        'site_id'
    );
    await DB.createIndex('sites', 'sites_by_owner', 'owner');
    await DB.createIndex('sites', 'sites_by_host', 'host');
    await DB.createTable(
        'keys',
        true,
        {
            key: { type: 'text' },
            owner_id: { type: 'bigint' },
        },
        'key'
    );
};
