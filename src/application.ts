import { RunningEngineInterface } from './RunningEngines/running-engine-interface';
import { RunningEngineFactory, RunningEnginesDIIdentifiers } from './RunningEngines/running-engines-dicontainer';
import { inject, injectable } from 'inversify';
import { RunningMode } from './RunningEngines/types';

@injectable()
export class Application {

    private _runningEngineFactory: RunningEngineFactory;
    private _runningEngine: RunningEngineInterface | null = null;

    constructor(@inject(RunningEnginesDIIdentifiers.runningEngineFactory) runningEngineFactory: RunningEngineFactory) {
        this._runningEngineFactory = runningEngineFactory;
    }

    get runningEngine() : RunningEngineInterface | null {
        return this._runningEngine;
    }

    init(runningMode: RunningMode) {
        this._runningEngine = this._runningEngineFactory(runningMode);        
    }
}
