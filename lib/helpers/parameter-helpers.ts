import { format, parseISO } from 'date-fns';

// Helper function to safely append parameters
export const appendParam = (
  apiQueryParams: URLSearchParams,
  key: string,
  value: string | null | undefined
) => {
  if (value && value.trim() !== '') {
    apiQueryParams.append(key, value);
  }
};

// Helper function to format and append numeric parameters
export const appendNumericParam = (
  apiQueryParams: URLSearchParams,
  key: string,
  value: string | null | undefined
) => {
  if (value) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      apiQueryParams.append(key, numericValue.toFixed(2)); // Ensure 2 decimal places
    }
  }
};

export const appendIntegerParam = (
  params: URLSearchParams,
  key: string,
  value: string | number | null | undefined
) => {
  if (value !== null && value !== undefined) {
    const intValue =
      typeof value === 'string' ? parseInt(value, 10) : Math.round(value);
    if (!isNaN(intValue)) {
      params.append(key, intValue.toString());
    }
  }
};

export const appendDateParam = (
  apiQueryParams: URLSearchParams,
  key: string,
  value: string | null | undefined
) => {
  if (value) {
    try {
      const date = parseISO(value);
      const formattedDate = format(date, 'yyyy-MM-dd');
      apiQueryParams.append(key, formattedDate);
    } catch (error) {
      console.error(`Error formatting date for ${key}:`, error);
    }
  }
};

// combine all the functions into a single object

export const parameterHelpers = {
  appendParam,
  appendNumericParam,
  appendDateParam
};

export default parameterHelpers;
