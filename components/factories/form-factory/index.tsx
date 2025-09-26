import React, { FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './styles.module.scss';

import type { Props as ButtonProps } from 'components/data-input/button';
import type InputProps from 'components/factories/input-factory/types/input-props';
import type InputTypes from 'components/factories/input-factory/types/input-types';
import type { Props as FieldsetProps } from 'components/data-input/fieldset';

import { handleErrors } from 'lib/helpers/handle-errors';

import Button from 'components/data-input/button';
import ButtonGroup from 'components/data-input/button-group';
import Fieldset from 'components/data-input/fieldset';
import InputFactory from 'components/factories/input-factory';
import Form from 'components/forms/form';

export interface FieldSetData extends FieldsetProps {
  /**
   * The legend to display above the fieldset
   */
  legend?: string;
  /**
   * The fields to display in the fieldset
   */
  fields: FieldData[];
}

export interface FieldData extends InputProps {
  /**
   * The label to display with the input
   */
  label: string;
  /**
   * Should the label be hidden?
   */
  hideLabel?: boolean;
  /**
   * The type of input to render
   * @default text
   */
  variant?: InputTypes;
}

export type FormData = {
  /**
   * The name of the form
   */
  name?: string;
  /**
   * The id of the form
   */
  id?: string;
  /**
   * A custom class name for the form
   */
  className?: string;
  /**
   * A form action to override the default form action
   */
  action?: string;
  /**
   * The fieldsets to display in the form (each fieldset can contain multiple fields, at least one fieldset is required)
   */
  fieldsets: FieldSetData[];
  /**
   * The buttons to display at the bottom of the form
   */
  actions?: ButtonProps[];
};

/*  Types */
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The form data to render (Not required if children are provided)
   */
  formData: FormData;
  /**
   * Form schema to validate against
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 3rd party library
  schema?: yup.ObjectSchema<any>;
  /**
   * The function to call when the form is submitted
   */
  onSubmit: FormEventHandler<HTMLFormElement>;
  /**
   * The default values for the form fields
   */
  defaultValues?: Record<string, unknown> | null;
  /**
   * The 'isSubmitting' state of the form
   */
  isSubmitting?: boolean;
  /**
   * A Test ID for the form (used by tests to target the form)
   * @default form-factory (or `form-factory-${formData.id}` if an id is provided in the formData)
   */
  testID?: string;
}

/**
 * The 'FormFactory' component automatically generates a form based on the provided form data
 */
export const FormFactory: React.FC<Props> = ({
  formData,
  schema,
  onSubmit,
  defaultValues,
  isSubmitting,
  testID = formData.id ? `form-factory-${formData.id}` : 'form-factory',
  className,
  ...props
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues || {},
    resolver: yupResolver(schema || yup.object())
  });

  return (
    <Form
      name={formData?.name || 'form-factory-form'}
      id={formData?.id || 'form-factory-form'}
      data-testid={testID}
      {...props}
      ref={undefined}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      action={formData.action || undefined}
      className={formData.className || className || undefined}
    >
      <>
        {formData.fieldsets?.map((fieldset, index) => {
          const fieldSetProps = {
            ...fieldset,
            fields: undefined
          };
          return (
            <Fieldset
              key={
                fieldset.legend ||
                `fieldset-${fieldset.id}` ||
                `fieldset-${index}`
              }
              {...fieldSetProps}
            >
              {fieldset.fields?.map((field) => {
                const { variant, id, name, hidden, ...rest } = field;
                return (
                  <InputFactory
                    key={id}
                    variant={variant || 'text'}
                    hidden={hidden || false}
                    {...rest}
                    {...handleErrors(errors, name)}
                    {...register(name)}
                  />
                );
              })}
            </Fieldset>
          );
        })}

        <ButtonGroup className={styles['button-group']}>
          {formData.actions ? (
            formData.actions?.map((action) => {
              return (
                <Button
                  key={action.label}
                  {...action}
                  ref={undefined}
                  loadingIndicator="Submitting..."
                  isLoading={isSubmitting}
                />
              );
            })
          ) : (
            <Button
              type="submit"
              label="Submit"
              ref={undefined}
              loadingIndicator="Submitting..."
              isLoading={isSubmitting}
            />
          )}
        </ButtonGroup>
      </>
    </Form>
  );
};

export default FormFactory;
