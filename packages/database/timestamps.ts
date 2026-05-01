type FirestoreTimestampLike = {
  toDate: () => Date;
};

type TimestampFactory<TimestampValue> = (date: Date) => TimestampValue;

export type FirestoreTimestampsToIsoStrings<T> =
  T extends FirestoreTimestampLike
    ? string
    : T extends Array<infer Item>
      ? FirestoreTimestampsToIsoStrings<Item>[]
      : T extends object
        ? { [Key in keyof T]: FirestoreTimestampsToIsoStrings<T[Key]> }
        : T;

const DEFAULT_DATE_TIME_KEYS = new Set([
  "date",
  "timeStamp",
  "createdAt",
  "updatedAt",
  "completedAt",
  "publishedAt",
  "savedAt",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isFirestoreTimestampLike(value: unknown): value is FirestoreTimestampLike {
  return (
    !!value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  );
}

function parseDateTime(value: unknown): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function firestoreTimestampsToIsoStrings<T>(
  value: T,
): FirestoreTimestampsToIsoStrings<T> {
  if (isFirestoreTimestampLike(value)) {
    return value.toDate().toISOString() as FirestoreTimestampsToIsoStrings<T>;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      firestoreTimestampsToIsoStrings(item)
    ) as FirestoreTimestampsToIsoStrings<T>;
  }

  if (!isRecord(value)) {
    return value as FirestoreTimestampsToIsoStrings<T>;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [
      key,
      firestoreTimestampsToIsoStrings(entryValue),
    ]),
  ) as FirestoreTimestampsToIsoStrings<T>;
}

export function isoStringsToFirestoreTimestamps<T, TimestampValue>(
  value: T,
  toTimestamp: TimestampFactory<TimestampValue>,
  dateTimeKeys: Iterable<string> = DEFAULT_DATE_TIME_KEYS,
): T {
  const dateTimeKeySet =
    dateTimeKeys instanceof Set ? dateTimeKeys : new Set(dateTimeKeys);

  function convert(current: unknown, key?: string): unknown {
    if (key && dateTimeKeySet.has(key)) {
      const date = parseDateTime(current);
      if (date) {
        return toTimestamp(date);
      }
    }

    if (Array.isArray(current)) {
      return current.map((item) => convert(item, key));
    }

    if (!isRecord(current)) {
      return current;
    }

    return Object.fromEntries(
      Object.entries(current).map(([entryKey, entryValue]) => [
        entryKey,
        convert(entryValue, entryKey),
      ]),
    );
  }

  return convert(value) as T;
}
