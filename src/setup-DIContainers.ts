import "reflect-metadata";

import { RunningEnginesDIContainer } from './RunningEngines/running-engines-dicontainer';
import { interfaces, ContainerModule, Container } from 'inversify';
import { Application } from './application';

export enum GlobalDIIdentifiers {
    application = 'application'
}


export const GlobalDIContainer = new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind,
        unbindAsync: interfaces.UnbindAsync,
        onActivation: interfaces.Container['onActivation'],
        onDeactivation: interfaces.Container['onDeactivation']
    ): void => {
        bind<Application>(GlobalDIIdentifiers.application).to(Application).inSingletonScope();
    }
);

export const container = new Container({"defaultScope": "Singleton"});

container.load(GlobalDIContainer);
container.load(RunningEnginesDIContainer);

