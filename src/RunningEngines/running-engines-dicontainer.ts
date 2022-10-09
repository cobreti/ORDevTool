import { ServerRunningEngine } from './server-running-engine';
import { CommandLineRunningEngine } from './commandline-running-engine';
import { interfaces, ContainerModule } from 'inversify'

export enum RunningEnginesDIIdentifiers {
    serverRunningEngine = 'running-engines.server',
    commandlineRunningEngine = 'running-engines.commandline'
}

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
        bind<CommandLineRunningEngine>(RunningEnginesDIIdentifiers.commandlineRunningEngine).to(CommandLineRunningEngine).inSingletonScope();
        bind<ServerRunningEngine>(RunningEnginesDIIdentifiers.serverRunningEngine).to(ServerRunningEngine).inTransientScope();
    }
);


