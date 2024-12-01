import { Stage } from './interface/pipeline-stage';

export class Pipeline<TInput, TOutput> {
  private stages: Stage<any, any>[] = [];

  addStage<TStageOutput>(stage: Stage<TInput, TStageOutput>): Pipeline<TInput, TStageOutput> {
    this.stages.push(stage);
    return this as unknown as Pipeline<TInput, TStageOutput>;
  }

  async execute(initialData: TInput): Promise<TOutput> {
    let result = initialData;
    for (const stage of this.stages) {
      result = await stage.execute(result);
    }
    return result as unknown as TOutput;
  }
}
