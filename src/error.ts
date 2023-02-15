export class SurflineError extends Error {
  status: number;
  message: string;

  constructor({status, message}: {status: number, message: string}) {
    super(message);

    this.status = status;
    this.message = message;
  }
};

export function isSurflineError(x: unknown): x is SurflineError {
  return x instanceof SurflineError;
}
