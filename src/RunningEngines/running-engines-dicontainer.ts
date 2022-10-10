import { ServerRunningEngine } from './server-running-engine';
import { CommandLineRunningEngine } from './commandline-running-engine';
import { interfaces, ContainerModule } from 'inversify'
import { RunningMode } from './types';
import { RunningEngineInterface } from './running-engine-interface';

export enum RunningEnginesDIIdentifiers {
    serverRunningEngine = 'running-engines.server',
    commandlineRunningEngine = 'running-engines.commandline',
    runningEngineFactory = 'running-engine.factory'
}


export declare type RunningEngineFactory = (mode: RunningMode) => RunningEngineInterface | null;


export const RunningEnginesDIContainer = new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind,
        unbindAsync: interfaces.UnbindAsync,
        onActivation: interfaces.Container['onActivation'],
        onDeactivation: interfaces.Container['onDeactivation']
    ) => {
        bind<RunningEngineInterface>(RunningEnginesDIIdentifiers.commandlineRunningEngine).to(CommandLineRunningEngine).inSingletonScope();
        bind<RunningEngineInterface>(RunningEnginesDIIdentifiers.serverRunningEngine).to(ServerRunningEngine).inSingletonScope();
        bind<interfaces.Factory<RunningEngineInterface | null>>(RunningEnginesDIIdentifiers.runningEngineFactory)
            .toFactory<RunningEngineInterface | null, [RunningMode]>((context: interfaces.Context) => {
                return (mode: RunningMode) => {
                    switch (mode) {
                        case RunningMode.commandLine:
                            return context.container.get<RunningEngineInterface>(RunningEnginesDIIdentifiers.commandlineRunningEngine);
                        case RunningMode.server:
                            return context.container.get<RunningEngineInterface>(RunningEnginesDIIdentifiers.serverRunningEngine);
                        default:
                            return null;
                    }
                };
            });
    }
);


