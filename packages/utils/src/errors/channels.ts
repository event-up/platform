export enum ChannelsErrorCode {
  SEND_FAILED = "SEND_FAILED",
  INVALID_RECIPIENT = "INVALID_RECIPIENT",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  PROVIDER_ERROR = "PROVIDER_ERROR",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR",
}

export class ChannelsError extends Error {
  constructor(
    public message: string,
    public code: ChannelsErrorCode,
    public result?: unknown
  ) {
    super(message);
    this.name = "ChannelsError";
    Object.setPrototypeOf(this, ChannelsError.prototype);
  }
}
