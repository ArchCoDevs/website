import { FormFactory, FormData } from 'components/factories/form-factory';

import {
  personalInfo,
  sizeRentLocation,
  propertyTypes,
  keyFeatures,
  schema
} from './form-data';

import styles from './styles.module.scss';

/** Import custom types */
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The name of the PropertyUpdates
   * @default 'PropertyUpdates'
   */
  name?: string;
  /**
   * The id of the PropertyUpdates
   * @default 'PropertyUpdates'
   */
  id?: string;
  /**
   * The callback to call when the form is submitted
   */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * The `PropertyUpdates` component is a form that puts users in touch with an agent.
 */
export const PropertyUpdates: React.FC<Props> = ({
  name = 'property-updates-form',
  id = 'property-updates-form',
  onSubmit,
  ...props
}) => {
  const actions = [
    {
      id: 'submit',
      label: 'Sign up',
      type: 'submit',
      variant: 'tertiary',
      className: styles['submit']
    }
  ];

  const formData = {
    fieldsets: [
      {
        fields: [
          ...personalInfo,
          {
            id: 'google-data-goes-here',
            name: 'google-data-goes-here',
            value: 'google-data-goes-here',
            hidden: true
          }
        ]
      },
      {
        id: 'size-rent-location',
        fields: sizeRentLocation,
        className: styles['size-rent-location']
      },
      {
        id: 'property-types',
        legend: 'Business space required*',
        fields: propertyTypes,
        className: styles['checkbox-group'],
        legendClassName: styles['span-columns']
      },
      {
        id: 'key-features',
        legend: 'Key features/Must haves',
        fields: keyFeatures,
        className: styles['checkbox-group'],
        legendClassName: styles['span-columns']
      }
    ],
    actions: actions
  } as FormData;

  return (
    <div className={styles['property-updates-form']}>
      <h2 className={styles['heading']}>Property updates</h2>
      <p>
        We will only use your information to email tailored property alerts
        relating to your requirements
      </p>
      <FormFactory
        {...props}
        name={name}
        id={id}
        formData={formData}
        schema={schema}
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className={styles['form']}
      />
    </div>
  );
};

PropertyUpdates.displayName = 'PropertyUpdates';

export default PropertyUpdates;
