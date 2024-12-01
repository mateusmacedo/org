export interface Stage<TInput, TOutput> {
  execute(data: TInput): Promise<TOutput>;
}
