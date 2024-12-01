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
