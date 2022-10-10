import "reflect-metadata";

import { ServerRunningEngine } from './RunningEngines/server-running-engine';
import { RunningEnginesDIContainer } from './RunningEngines/running-engines-dicontainer';
import { CommandLineRunningEngine } from './RunningEngines/commandline-running-engine';

import { describe, test, expect } from '@jest/globals';
import { Container } from 'inversify';
import { GlobalDIContainer, GlobalDIIdentifiers } from './setup-DIContainers';
import { Application } from './application';
import { RunningMode } from './RunningEngines/types';

describe('application test', () => {

    test('creating application for commandline', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);
        container.load(GlobalDIContainer);

        const app = container.get<Application>(GlobalDIIdentifiers.application);
        app.init(RunningMode.commandLine);

        expect(app.runningEngine).toBeInstanceOf(CommandLineRunningEngine);
    })

    test('creating application for server', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);
        container.load(GlobalDIContainer);

        const app = container.get<Application>(GlobalDIIdentifiers.application);
        app.init(RunningMode.server);

        expect(app.runningEngine).toBeInstanceOf(ServerRunningEngine);
    })

});
