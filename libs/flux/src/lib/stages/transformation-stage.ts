import { Stage } from '../interface/pipeline-stage';

export class TransformationStage<TInput, TOutput> implements Stage<TInput, TOutput> {
  constructor(private transformer: (input: TInput) => TOutput) {}

  async execute(data: TInput): Promise<TOutput> {
    return this.transformer(data);
  }
}
