export const updateEntity = <T>(entity: T, updates: Partial<T>) => {
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      (entity as any)[key] = value;
    }
  });

  return entity;
};
