export type InputValue = {
  label: string;
  value: string;
};

/**
 * Converts an array of strings to an array of InputValue objects
 * @param array the array to convert to InputValue
 * @returns an array of InputValue objects
 */
export const arrayToInputValue = (array: string[] | string): InputValue[] => {
  array = Array.isArray(array) ? array : [array];
  return array.map((item) => ({ label: item, value: item }));
};

export default arrayToInputValue;
