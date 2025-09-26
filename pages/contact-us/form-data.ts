import * as yup from 'yup';

import styles from './styles.module.scss';

export const fields = [
  {
    id: 'FirstName',
    label: 'First name',
    name: 'FirstName',
    required: true,
    hideLabel: true,
    placeholder: 'First name*'
  },
  {
    id: 'LastName',
    label: 'Last name',
    name: 'LastName',
    required: true,
    hideLabel: true,
    placeholder: 'Last name*'
  },
  {
    id: 'EmailAddress',
    label: 'Email',
    name: 'EmailAddress',
    required: true,
    hideLabel: true,
    placeholder: 'Email*'
  },
  {
    id: 'Phone',
    label: 'Telephone',
    name: 'Phone',
    required: true,
    hideLabel: true,
    placeholder: 'Telephone*'
  },
  {
    id: 'BusinessType',
    label: 'Business type',
    name: 'BusinessType',
    hideLabel: true,
    placeholder: 'Business type*'
  },
  {
    id: 'Address',
    label: 'Address',
    name: 'Address',
    hideLabel: true,
    placeholder: 'Address*',
    className: styles['span-columns']
  },
  {
    id: 'EnquiryTopic',
    'data-testid': 'EnquiryTopic',
    label: 'What is your enquiry about?*',
    name: 'EnquiryTopic',
    variant: 'select',
    placeholder: 'Choose an option...',
    options: [
      {
        value: 'property',
        label: 'Property'
      },
      {
        value: 'existing-customer',
        label: 'Existing customer'
      },
      {
        value: 'press',
        label: 'Press'
      },
      {
        value: 'filming',
        label: 'Filming'
      },
      {
        value: 'flexible-leasing',
        label: 'Flexible leasing'
      },
      {
        value: 'general',
        label: 'General'
      }
    ]
  },
  {
    id: 'Message',
    label: 'Message',
    name: 'Message',
    variant: 'textarea',
    required: true,
    hideLabel: true,
    placeholder: 'Message*',
    className: styles['span-columns']
  },
  {
    id: 'gclid',
    name: 'gclid',
    type: 'hidden',
    label: 'gclid',
    hideLabel: true,
    hidden: true
  }
];

export const schema = yup
  .object()
  .shape({
    FirstName: yup.string().required('First name is required'),
    LastName: yup.string().required('Last name is required'),
    EmailAddress: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    Phone: yup.string().required('Phone number is required'),
    BusinessType: yup.string().required('Business type is required'),
    Address: yup.string().required('Address is required'),
    EnquiryTopic: yup.string().required('Please select an enquiry type'),
    Message: yup.string().required('Message is required'),
    gclid: yup.string().optional()
  })
  .required();

export type FormValues = yup.InferType<typeof schema>;
