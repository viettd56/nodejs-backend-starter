import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

/**
 * Service for signing and verifying JWT tokens with caching.
 */
@Injectable()
export class HealthCheckUsecase {
    constructor() {}
    public healthCheck = () => {
        return {
            status: true,
            timestamp: moment().unix(),
        };
    };
}
