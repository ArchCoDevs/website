export const filterTable = (
  data: (string | number)[][],
  filterTerm: string,
  filterColumn: number
) => {
  // If the filter term is exactly "true" or "false", map it to the corresponding emoji
  let term = filterTerm.toLowerCase();
  if (term === 'true') {
    term = '✅';
  } else if (term === 'false') {
    term = '❌';
  }

  return data.filter((row) => {
    const rowValue = row[filterColumn].toString();
    return rowValue.toLowerCase().includes(term);
  });
};
