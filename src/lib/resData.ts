interface TMeta {
  statusCode: number;
  message: string;
}

export class ResData<TData> {
  meta: TMeta;

  constructor(
    statusCode: number,
    message: string,
    public data: TData | null = null
  ) {
    this.meta = {
      message,
      statusCode,
    };
  }
}
