import { Application } from '@edgelabs/types';
import { createLogger } from '@lvksh/logger';

const f: Partial<Application> = {};

const log = createLogger({
    debug: 'DEBUG',
    info: 'INFO',
});

console.log('hi');
log.debug('hi');
log.debug('never gonna give u up!');
