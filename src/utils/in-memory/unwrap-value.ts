export const unwrapAll = (obj: any) => {
  const unwrapped: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === "object" && "set" in value) {
      unwrapped[key] = value.set;
    } else {
      unwrapped[key] = value;
    }
  });
  return unwrapped;
};
