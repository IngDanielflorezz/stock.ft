export class Result<T> {
  private constructor(
    public readonly success: boolean,
    public readonly value?: T,
    public readonly error?: string,
    public readonly statusCode: number = 200,
  ) {}

  static ok<T>(value: T): Result<T> {
    return new Result(true, value, undefined, 200);
  }

  static created<T>(value: T): Result<T> {
    return new Result(true, value, undefined, 201);
  }

  static fail<T>(error: string, statusCode = 400): Result<T> {
    return new Result<T>(false, undefined, error, statusCode);
  }

  static notFound<T>(entity: string): Result<T> {
    return new Result<T>(false, undefined, `${entity} no encontrado`, 404);
  }

  static unauthorized<T>(): Result<T> {
    return new Result<T>(false, undefined, "No autorizado", 401);
  }

  toResponse(): Response {
    if (this.success) {
      return Response.json(this.value, { status: this.statusCode });
    }
    return Response.json({ error: this.error }, { status: this.statusCode });
  }
}
