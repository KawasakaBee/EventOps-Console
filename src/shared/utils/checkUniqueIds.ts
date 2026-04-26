const checkUniqueIds = (
  items: { id: string }[],
  entityName: string,
  errors: string[],
) => {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      errors.push(`В ${entityName} найден дублирующийся id: ${item.id}`);
    } else {
      seen.add(item.id);
    }
  }
};

export default checkUniqueIds;
