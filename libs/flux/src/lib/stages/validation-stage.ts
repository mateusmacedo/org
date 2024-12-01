import { Stage } from '../interface/pipeline-stage';

export class ValidationStage<T> implements Stage<T, T> {
  async execute(data: T): Promise<T> {
    if (!data) {
      throw new Error('Dados inválidos: entrada não pode ser nula ou indefinida');
    }
    return data;
  }
}
