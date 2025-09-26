import ComponentStatuses from 'lib/types/component-statuses';
import type { FieldErrors } from 'react-hook-form';

export const handleErrors = (errors: FieldErrors, input: string) => {
  if (errors[input]) {
    return {
      status: 'error' as ComponentStatuses,
      statusMessage: errors[input]?.message as string
    };
  }
  return {
    status: 'default' as ComponentStatuses,
    statusMessage: '' as string
  };
};

export default handleErrors;
