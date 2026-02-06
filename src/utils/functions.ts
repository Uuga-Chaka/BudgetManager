export const isPrimitive = (value: unknown) => {
  return (
    value instanceof Number ||
    value instanceof String ||
    value instanceof Boolean ||
    value instanceof Symbol ||
    value instanceof BigInt
  );
};
