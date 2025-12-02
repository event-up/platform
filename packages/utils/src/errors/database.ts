import { FirebaseError } from "firebase/app";

export enum DatabaseErrorCode {
  // Not Found Errors
  EVENT_NOT_FOUND = "EVENT_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  ORGANIZER_NOT_FOUND = "ORGANIZER_NOT_FOUND",
  REGISTRATION_NOT_FOUND = "REGISTRATION_NOT_FOUND",
  ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",

  // Permission Errors
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

  // Validation Errors
  INVALID_DATA = "INVALID_DATA",

  // Conflict Errors
  DUPLICATE_ENTRY = "DUPLICATE_ENTRY",

  // Operation Errors
  OPERATION_FAILED = "OPERATION_FAILED",

  // Connection Errors
  CONNECTION_ERROR = "CONNECTION_ERROR",
}

export class DatabaseError extends Error {
  constructor(
    public code: DatabaseErrorCode,
    public message: string,
    public originalError?: FirebaseError | Error
  ) {
    super(message);
    this.name = "DatabaseError";
  }

  static fromFirebaseError(error: FirebaseError | Error): DatabaseError {
    if (!(error instanceof FirebaseError)) {
      return new DatabaseError(
        DatabaseErrorCode.OPERATION_FAILED,
        error.message,
        error
      );
    }
    let code: DatabaseErrorCode;
    let message: string;

    switch (error.code) {
      case "permission-denied":
        code = DatabaseErrorCode.INSUFFICIENT_PERMISSIONS;
        message = "You do not have permission to perform this operation";
        break;
      case "not-found":
        code = DatabaseErrorCode.EVENT_NOT_FOUND;
        message = "The requested resource was not found";
        break;
      case "already-exists":
        code = DatabaseErrorCode.DUPLICATE_ENTRY;
        message = "A resource with this identifier already exists";
        break;
      default:
        code = DatabaseErrorCode.OPERATION_FAILED;
        message = "The operation failed to complete";
    }

    return new DatabaseError(code, message, error);
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string, originalError?: Error) {
    super(DatabaseErrorCode.INVALID_DATA, message, originalError);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends DatabaseError {
  constructor(resourceType: string, id: string, originalError?: Error) {
    super(
      DatabaseErrorCode.EVENT_NOT_FOUND,
      `${resourceType} with id ${id} not found`,
      originalError
    );
    this.name = "NotFoundError";
  }
}

export class PermissionError extends DatabaseError {
  constructor(message: string, originalError?: Error) {
    super(DatabaseErrorCode.INSUFFICIENT_PERMISSIONS, message, originalError);
    this.name = "PermissionError";
  }
}
