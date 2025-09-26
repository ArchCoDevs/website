import * as yup from 'yup';

import styles from './styles.module.scss';

import { stations } from 'lib/data/stations';

export const personalInfo = [
  {
    id: 'first-name',
    label: 'First name',
    name: 'first-name',
    required: true,
    hideLabel: true,
    placeholder: 'First name*'
  },
  {
    id: 'last-name',
    label: 'Last name',
    name: 'last-name',
    required: true,
    hideLabel: true,
    placeholder: 'Last name*'
  },
  {
    id: 'telephone',
    label: 'Telephone',
    name: 'telephone',
    required: true,
    hideLabel: true,
    placeholder: 'Telephone*'
  },
  {
    id: 'email',
    label: 'Email',
    name: 'email',
    required: true,
    hideLabel: true,
    placeholder: 'Email*'
  }
];

export const sizeRentLocation = [
  {
    id: 'size',
    label: 'Size',
    name: 'size',
    required: true,
    variant: 'select',
    placeholder: 'Select...',
    options: [
      {
        value: 'any',
        label: 'Any'
      },
      {
        value: '< 1000',
        label: '< 1000 sq ft'
      },
      {
        value: '1000-2000',
        label: '1000 - 2000 sq ft'
      },
      {
        value: '2000-3000',
        label: '2000 - 3000 sq ft'
      },
      {
        value: '> 3000',
        label: '> 3000 sq ft'
      }
    ]
  },
  {
    id: 'rent',
    label: 'Rent',
    name: 'rent',
    required: true,
    variant: 'select',
    placeholder: 'Select...',
    options: [
      {
        value: 'any',
        label: 'Any'
      },
      {
        value: '0 - 5000',
        label: '£0 - £5000 pa'
      },
      {
        value: '5000-10000',
        label: '£5000 - £10000 pa'
      },
      {
        value: '10000-25000',
        label: '£10000 - £25000 pa'
      },
      {
        value: '25000-50000',
        label: '£25000 - £50000 pa'
      },
      {
        value: '> 50000',
        label: '> £50000 pa'
      }
    ]
  },
  {
    id: 'nearest-station',
    label: 'Nearest station',
    name: 'nearest-station',
    variant: 'select',
    placeholder: 'Select...',
    required: true,
    options: stations
  }
];

export const propertyTypes = [
  {
    id: 'All types',
    label: 'All types',
    value: 'all-types',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Office',
    label: 'Office',
    value: 'office',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Warehouse',
    label: 'Warehouse',
    value: 'warehouse',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Industrial',
    label: 'Industrial',
    value: 'industrial',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Retail',
    label: 'Retail',
    value: 'retail',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Flexible lease',
    label: 'Flexible lease',
    value: 'flexible-lease',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Flexible use',
    label: 'Flexible use',
    value: 'flexible-use',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Leisure',
    label: 'Leisure',
    value: 'leisure',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'F&B',
    label: 'F&B',
    value: 'f-and-b',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Storage',
    label: 'Storage',
    value: 'storage',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Land',
    label: 'Land',
    value: 'land',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Light Industrial',
    label: 'Light Industrial',
    value: 'light-industrial',
    name: 'property-types',
    variant: 'checkbox'
  },
  {
    id: 'Warehousing',
    label: 'Warehousing',
    value: 'warehousing',
    name: 'property-types',
    variant: 'checkbox'
  }
];

export const keyFeatures = [
  {
    id: 'All types',
    label: 'All types',
    value: 'all-types',
    name: 'key-features',
    variant: 'checkbox',
    className: styles['span-columns']
  },
  {
    id: '24/7 access',
    label: '24/7 access',
    value: '24-7-access',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'Concrete flooring',
    label: 'Concrete flooring',
    value: 'concrete-flooring',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'Self-contained site',
    label: 'Self-contained site',
    value: 'self-contained-site',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'WC facilities',
    label: 'WC facilities',
    value: 'wc-facilities',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'Electric shutters',
    label: 'Electric shutters',
    value: 'electric-shutters',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'Newly refurbished',
    label: 'Newly refurbished',
    value: 'newly-refurbished',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: '3-phase power supply',
    label: '3-phase power supply',
    value: '3-phase-power-supply',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'Fully glazed frontage',
    label: 'Fully glazed frontage',
    value: 'fully-glazed-frontage',
    name: 'key-features',
    variant: 'checkbox'
  },
  {
    id: 'LED lighting',
    label: 'LED lighting',
    value: 'led-lighting',
    name: 'key-features',
    variant: 'checkbox'
  }
];
export const schema = yup.object().shape({
  'first-name': yup.string().required('First name is required'),
  'last-name': yup.string().required('Last name is required'),
  telephone: yup
    .string()
    .required('Telephone is required')
    .matches(
      /^(\+?\d{1,4}?[\s.-]?)?(\(?\d{1,4}?\)?[\s.-]?)?[\d\s.-]{3,}$/,
      'Telephone must be a valid phone number'
    ),
  email: yup.string().email('Invalid email').required('Email is required'),
  size: yup.string().required('Size is required'),
  rent: yup.string().required('Rent is required'),
  'nearest-station': yup.string().required('Nearest station is required'),
  'property-types': yup
    .array()
    .transform(function (value, originalValue) {
      if (Array.isArray(originalValue) && originalValue.includes('all-types')) {
        return ['all-types'];
      }
      return originalValue === false ? [] : originalValue;
    })
    .min(1, 'Please select at least 1 property type')
    .required('Please select at least 1 property type'),
  'key-features': yup.array().transform(function (value, originalValue) {
    if (Array.isArray(originalValue) && originalValue.includes('all-types')) {
      return ['all-types'];
    }
    return originalValue === false ? [] : originalValue;
  })
});

export type FormValues = yup.InferType<typeof schema>;
