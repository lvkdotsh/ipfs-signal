import { EMPTY_PERMISSIONS, grantPermission } from 'permissio';

export enum KeyPerms {
    FULL,

    APPS_READ,
    APPS_WRITE,
    APPS_DELETE,

    DOMAINS_READ,
    DOMAINS_WRITE,
    DOMAINS_DELETE,

    DEPLOYMENTS_READ,
    DEPLOYMENTS_WRITE,
    DEPLOYMENTS_DELETE,
}

export const FullPerm = grantPermission(EMPTY_PERMISSIONS, KeyPerms.FULL);
