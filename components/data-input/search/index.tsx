import React, { useState } from 'react';
import { changeCase } from 'lib/helpers/change-case';

// Import Components
import InputFactory from 'components/factories/input-factory';
import Button from 'components/data-input/button';

// Import Stylesheet
import styles from './styles.module.scss';

// Import custom types
import InputComponent from 'lib/types/input-component';
import { InputValue } from 'lib/types/input-value';

interface Props extends Omit<InputComponent, 'onSubmit'> {
  value: InputValue;
  onSubmit: (value: InputValue) => void;
}

// Render component
export const Search: React.FC<Props> = ({
  id,
  name,
  placeholder,
  value = '',
  onSubmit
}: Props) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles['search']}>
      <InputFactory
        name={name}
        id={id || changeCase(name, 'kebab')}
        label={placeholder || name || 'Search'}
        hideLabel
        placeholder={placeholder}
        variant="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          e.key === 'Enter' && onSubmit(searchTerm);
        }}
      />
      <Button
        label={`Search`}
        className={styles['button']}
        hideLabel
        small
        variant="primary"
        onClick={() => onSubmit(searchTerm)}
        icon="search"
      />
    </div>
  );
};

Search.displayName = 'Search';

export default Search;
