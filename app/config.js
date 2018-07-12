import { chosenServer } from './devControlPanel';

const config = {
  development: 'http://localhost:3000',
  staging: 'https://blu-api-staging.aws.gigsternetwork.com'
}
export const API_URL = config[chosenServer];
// export const API_URL = config['development'];
