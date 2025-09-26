import * as yup from 'yup';

export const fields = [
  {
    id: 'first-name',
    label: 'First name',
    name: 'FirstName',
    required: true,
    hideLabel: true,
    placeholder: 'First name*'
  },
  {
    id: 'last-name',
    label: 'Last name',
    name: 'LastName',
    required: true,
    hideLabel: true,
    placeholder: 'Last name*'
  },
  {
    id: 'telephone',
    label: 'Telephone',
    name: 'Phone',
    required: true,
    hideLabel: true,
    placeholder: 'Telephone*'
  },
  {
    id: 'company-name',
    label: 'company name',
    name: 'CompanyName',
    required: true,
    hideLabel: true,
    placeholder: 'Company name*'
  },
  {
    id: 'email',
    label: 'Email',
    name: 'EmailAddress',
    required: true,
    hideLabel: true,
    placeholder: 'Email*'
  },
  {
    id: 'timescale',
    'data-testid': 'timescale',
    label: 'Timescale',
    name: 'TimeScale',
    variant: 'select',
    placeholder: 'Timescale*',
    hideLabel: true,
    options: [
      {
        value: 'Immediately',
        label: 'Immediately'
      },
      {
        value: 'Within 3 months',
        label: 'Within 3 months'
      },
      {
        value: 'Within 6 months',
        label: 'Within 6 months'
      },
      {
        value: '6+ months',
        label: '6+ months'
      }
    ]
  },
  {
    id: 'enquiry-topic',
    name: 'EnquiryTopic',
    value: 'property',
    hidden: true
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
    FirstName: yup
      .string()
      .required('First name is required')
      .matches(
        /^[a-zA-Zàâäéèêëïîôöùûüÿçñ' -]+$/,
        'First name contains invalid characters'
      ),
    LastName: yup
      .string()
      .required('Last name is required')
      .matches(
        /^[a-zA-Zàâäéèêëïîôöùûüÿçñ' -]+$/,
        'Last name contains invalid characters'
      ),
    Phone: yup
      .string()
      .required('Telephone is required')
      .matches(
        /^(\+?\d{1,4}?[\s.-]?)?(\(?\d{1,4}?\)?[\s.-]?)?[\d\s.-]{3,}$/,
        'Telephone must be a valid phone number'
      ),
    CompanyName: yup
      .string()
      .required('Company name is required')
      .matches(
        /^[a-zA-Z0-9àâäéèêëïîôöùûüÿçñ&'., -]+$/,
        'Company name contains invalid characters'
      ),
    EmailAddress: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    TimeScale: yup.string().required('Timescale is required'),
    gclid: yup.string().optional()
  })
  .required();

export type FormValues = yup.InferType<typeof schema>;
