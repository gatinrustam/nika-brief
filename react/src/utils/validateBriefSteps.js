export const validateBriefSteps = (steps) => {
    const ids = steps.map(s => s.id);
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    if (duplicates.length) {
      throw new Error(
        `❌ В briefSteps обнаружены дублирующиеся id: ${[...new Set(duplicates)].join(', ')}`
      );
    }
};