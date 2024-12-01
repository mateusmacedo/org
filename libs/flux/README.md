# @libs/flux

## Descrição
Uma biblioteca TypeScript para processamento de dados em pipeline, oferecendo uma abordagem flexível e extensível para transformação e validação de dados.

## Instalação

```bash
npm install @libs/flux
```

## Características Principais

- Pipeline síncrono e assíncrono
- Processamento em cadeia com observables (RxJS)
- Estágios de transformação e validação personalizáveis
- Tipagem forte com TypeScript
- Arquitetura extensível

## Uso Básico

### Pipeline Simples

```typescript
import { Pipeline, ValidationStage, TransformationStage } from '@libs/flux';

interface DataItem {
  id: string;
  value: number;
}

// Criar um pipeline
const pipeline = new Pipeline<DataItem, DataItem>()
  .addStage(new ValidationStage<DataItem>())
  .addStage(new TransformationStage<DataItem, DataItem>((data) => ({
    ...data,
    value: data.value * 2
  })));

// Executar o pipeline
const result = await pipeline.execute({
  id: '123',
  value: 42
});
```

### Processor Chain com RxJS

```typescript
import { ProcessorChain, ValidationStage, TransformationStage } from '@libs/flux';

interface InputData {
  id: string;
  value: number;
}

interface OutputData {
  id: string;
  processedValue: number;
}

const chain = new ProcessorChain<InputData, OutputData>()
  .addProcessor(new ValidationStage<InputData>())
  .addProcessor(new TransformationStage<InputData, OutputData>((input) => ({
    id: input.id,
    processedValue: input.value * 2
  })));

chain.process(inputData).subscribe({
  next: (result) => console.log('Processado:', result),
  error: (error) => console.error('Erro:', error),
  complete: () => console.log('Processamento completo')
});
```

## Componentes Principais

### Pipeline
- Execução sequencial de estágios
- Processamento síncrono/assíncrono
- Transformação de dados tipada

### ProcessorChain
- Processamento baseado em Observable
- Encadeamento de processadores
- Tratamento de erros integrado

### Estágios Disponíveis

#### ValidationStage
- Validação básica de dados
- Extensível para validações personalizadas

#### TransformationStage
- Transformação de dados flexível
- Suporte a tipos de entrada e saída diferentes

## Configuração do Projeto

O projeto utiliza as seguintes tecnologias:
- TypeScript
- RxJS
- SWC para compilação
- Jest para testes
- ESLint para linting

## Licença
MIT

## Contribuição
Contribuições são bem-vindas! Por favor, siga as diretrizes de contribuição do projeto.

---

Para mais exemplos e documentação detalhada, consulte os arquivos de exemplo em:

### Pipeline Example

src/lib/example/pipeline-example.ts

```typescript
import { Pipeline } from '../pipeline';
import { TransformationStage } from '../stages/transformation-stage';
import { ValidationStage } from '../stages/validation-stage';


interface DataItem {
  id: string;
  value: number;
}

async function main(): Promise<void> {
    const pipeline = new Pipeline<DataItem, DataItem>()
        .addStage(new ValidationStage<DataItem>())
        .addStage(new TransformationStage<DataItem, DataItem>((data: DataItem) => ({
            ...data,
            value: data.value * 2
        })));

    const result = await pipeline.execute({
        id: '123',
        value: 42
    });

    console.log('Resultado:', result);
}

main().catch(console.error);
```

### ProcessorChain Example

src/lib/example/processor-chain-example.ts

```typescript
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
```
