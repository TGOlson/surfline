export class SurflineError extends Error {
  status: number;
  message: string;

  constructor({status, message}: {status: number, message: string}) {
    super(message);

    this.status = status;
    this.message = message;
  }
};
