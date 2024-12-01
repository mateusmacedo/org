import { TransformationStage } from './../stages/transformation-stage';
import { ValidationStage } from './../stages/validation-stage';
import { ProcessorChain } from '../processor-chain';
interface InputData {
  id: string;
  value: number;
}

interface OutputData {
  id: string;
  processedValue: number;
}

const processorChain = new ProcessorChain<InputData, OutputData>()
  .addProcessor(new ValidationStage<InputData>())
  .addProcessor(new TransformationStage<InputData, OutputData>((input) => ({
    id: input.id,
    processedValue: input.value * 2
  })));

const inputData: InputData = {
  id: '123',
  value: 42
};

console.log('Input:', inputData);
processorChain.process(inputData).subscribe({
  next: (result) => console.log('Processado:', result),
  error: (error) => console.error('Erro:', error),
  complete: () => console.log('Processamento completo')
});
