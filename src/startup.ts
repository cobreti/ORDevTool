import { Application } from './application';
import { container, DIIdentifiers } from './setup-DIContainers';

console.info('startup starting');

const app : Application = container.get<Application>(DIIdentifiers.application);

app.init();
