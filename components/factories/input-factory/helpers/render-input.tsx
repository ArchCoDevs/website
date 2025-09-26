// Import types
import InputTypes from '../types/input-types';
import InputOption from 'lib/types/input-option';

// Import components
import Autocomplete from 'components/data-input/autocomplete';
import Checkbox from 'components/data-input/checkbox';
import CheckboxGroup from 'components/data-input/checkbox-group';
import Datetime from 'components/data-input/datetime';
import File from 'components/data-input/file';
import Label from 'components/data-input/label';
import Radio from 'components/data-input/radio';
import RadioGroup from 'components/data-input/radio-group';
import Select from 'components/data-input/select';
import Text from 'components/data-input/text';
import Textarea from 'components/data-input/textarea';
import ToggleSwitch from 'components/data-input/toggle-switch';
import { LocationAutocomplete } from 'components/data-input/location-autocomplete';

const renderInput = (
  name: string,
  type: InputTypes,
  props: React.ComponentProps<'input'>,
  label: string,
  options: unknown[] = [],
  hideLabel = false
) => {
  switch (type) {
    case 'textarea':
      return (
        <Textarea
          name={name}
          {...(props as React.ComponentProps<'textarea'>)}
        />
      );
    case 'radio':
      return (
        <Label
          id={props.id}
          text={label}
          position="after"
          required={props.required}
        >
          <Radio
            name={name}
            {...props}
            aria-label={hideLabel ? label : undefined}
          />
        </Label>
      );
    case 'checkbox':
      return (
        <Label
          id={props.id}
          text={label}
          position="after"
          required={props.required}
        >
          <Checkbox
            name={name}
            {...props}
            aria-label={hideLabel ? label : undefined}
          />
        </Label>
      );
    case 'file':
      return (
        <File
          name={name}
          {...props}
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'datetime':
      return (
        <Datetime
          name={name}
          {...props}
          aria-label={hideLabel ? label : undefined}
        />
      );
    // These components are all variants of `InputText` so they need to have a type prop added
    case 'password':
      return (
        <Text
          name={name}
          {...props}
          type="password"
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'email':
      return (
        <Text
          name={name}
          {...props}
          type="email"
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'number':
      return (
        <Text
          name={name}
          {...props}
          type="number"
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'tel':
      return (
        <Text
          name={name}
          {...props}
          type="tel"
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'url':
      return (
        <Text
          name={name}
          {...props}
          type="url"
          aria-label={hideLabel ? label : undefined}
        />
      );
    // These components all support the options prop, so be sure to pass it down
    case 'select':
      return (
        <Select
          name={name}
          {...(props as React.ComponentProps<'select'>)}
          options={options as InputOption[]}
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          name={name}
          {...props}
          options={options as string[]}
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'radiogroup':
      return (
        <RadioGroup
          name={name}
          groupLabel={label}
          options={options as InputOption[]}
          aria-label={hideLabel ? label : undefined}
          {...props}
        />
      );
    case 'checkboxgroup':
      return (
        <CheckboxGroup
          name={name}
          groupLabel={label}
          options={options as InputOption[]}
          aria-label={hideLabel ? label : undefined}
          {...props}
        />
      );
    case 'toggleswitch':
      return (
        <ToggleSwitch
          name={name}
          {...props}
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'location-autocomplete':
      return (
        <LocationAutocomplete
          name={name}
          {...props}
          aria-label={hideLabel ? label : undefined}
        />
      );
    case 'text':
    default:
      return (
        <Text
          name={name}
          {...props}
          aria-label={hideLabel ? label : undefined}
        />
      );
  }
};

export default renderInput;
