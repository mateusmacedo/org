import { Stage } from './interface/pipeline-stage';
import { Observable } from 'rxjs';

export class ProcessorChain<I, O> {
  private processors: Stage<unknown, unknown>[] = [];

  addProcessor<T>(processor: Stage<I, T>): ProcessorChain<I, T> {
    this.processors.push(processor);
    return this as unknown as ProcessorChain<I, T>;
  }

  process(input: I): Observable<O> {
    return new Observable<O>(subscriber => {
      let current = input;

      const processNext = async (index: number) => {
        if (index >= this.processors.length) {
          subscriber.next(current as unknown as O);
          subscriber.complete();
          return;
        }

        const processor = this.processors[index];
        try {
          const result = await processor.execute(current);
          current = result as unknown as I;
          processNext(index + 1);
        } catch (error) {
          subscriber.error(error);
        }
      };

      processNext(0);
    });
  }
}
