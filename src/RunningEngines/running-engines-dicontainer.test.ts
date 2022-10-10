import "reflect-metadata";

import { RunningMode } from './types';
import { ServerRunningEngine } from './server-running-engine';

import { RunningEngineFactory, RunningEnginesDIContainer, RunningEnginesDIIdentifiers } from './running-engines-dicontainer';

import { describe, test, expect } from '@jest/globals';
import { Container } from "inversify";
import { CommandLineRunningEngine } from './commandline-running-engine';

describe('Running Engine DIContainer module', () => {

    test('creating of CommandLineEngine directly', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);

        const engine = container.get(RunningEnginesDIIdentifiers.commandlineRunningEngine);

        expect(engine).not.toBeNull();
        expect(engine).not.toBeUndefined();
        expect(engine).toBeInstanceOf(CommandLineRunningEngine);
    })

    test('creating of ServerEngine directly', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);

        const engine = container.get(RunningEnginesDIIdentifiers.serverRunningEngine);

        expect(engine).not.toBeNull();
        expect(engine).not.toBeUndefined();
        expect(engine).toBeInstanceOf(ServerRunningEngine);
    })


    test('creating of CommandLineEngine using Factory', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);

        const factory = container.get<RunningEngineFactory>(RunningEnginesDIIdentifiers.runningEngineFactory);
        const engine = factory(RunningMode.commandLine);

        expect(engine).not.toBeNull();
        expect(engine).not.toBeUndefined();
        expect(engine).toBeInstanceOf(CommandLineRunningEngine);
    })


    test('creating of ServerEngine using Factory', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);

        const factory = container.get<RunningEngineFactory>(RunningEnginesDIIdentifiers.runningEngineFactory);
        const engine = factory(RunningMode.server);

        expect(engine).not.toBeNull();
        expect(engine).not.toBeUndefined();
        expect(engine).toBeInstanceOf(ServerRunningEngine);
    })

    test('unknown value using Factory', () => {
        const container = new Container();
        container.load(RunningEnginesDIContainer);

        const factory = container.get<RunningEngineFactory>(RunningEnginesDIIdentifiers.runningEngineFactory);
        const engine = factory('invalid value' as RunningMode);

        expect(engine).toBeNull();
    })

});
