import * as yup from 'yup';

export const fields = [
  {
    id: 'first-name',
    label: 'First name',
    name: 'first-name',
    required: true,
    placeholder: 'First name*'
  },
  {
    id: 'last-name',
    label: 'Last name',
    name: 'last-name',
    required: true,
    placeholder: 'Last name*'
  },
  {
    id: 'phone',
    label: 'Telephone',
    name: 'phone',
    placeholder: 'Telephone'
  },
  {
    id: 'username',
    label: 'Email (Your username)',
    name: 'username',
    required: true,
    placeholder: 'Email*'
  }
];

export const schema = yup.object().shape({
  'first-name': yup
    .string()
    .required('First name is required')
    .matches(
      /^[a-zA-Zàâäéèêëïîôöùûüÿçñ' -]+$/,
      'First name contains invalid characters'
    ),
  'last-name': yup
    .string()
    .required('Last name is required')
    .matches(
      /^[a-zA-Zàâäéèêëïîôöùûüÿçñ' -]+$/,
      'Last name contains invalid characters'
    ),
  phone: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(
      /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
      'Please enter a valid UK phone number'
    )
    .nullable(),
  username: yup.string().email('Please enter a valid email address')
});

export type FormValues = yup.InferType<typeof schema>;
