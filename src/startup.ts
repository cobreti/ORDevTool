import { Application } from './application';
import { RunningMode } from './RunningEngines/types';
import { container, GlobalDIIdentifiers } from './setup-DIContainers';

console.info('startup starting');

const app : Application = container.get<Application>(GlobalDIIdentifiers.application);

app.init(RunningMode.commandLine);
