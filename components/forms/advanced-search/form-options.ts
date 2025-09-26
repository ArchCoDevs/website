import { subDays } from 'date-fns';

/**
 * The default options for the advanced search form
 */

const today = new Date();

export const addedToSite = [
  { label: 'All', value: 'All' },
  { label: 'Last 30 days', value: subDays(today, 30).toISOString() },
  { label: 'Older than 30 days', value: subDays(today, 3650).toISOString() }
];

export const rentMin = [
  { label: 'No min', value: 0 },
  { label: '£1000', value: 1000 },
  { label: '£2000', value: 2000 },
  { label: '£3000', value: 3000 },
  { label: '£4000', value: 4000 },
  { label: '£5000', value: 5000 },
  { label: '£6000', value: 6000 },
  { label: '£7000', value: 7000 },
  { label: '£8000', value: 8000 },
  { label: '£9000', value: 9000 },
  { label: '£10000', value: 10000 }
];

// rentMax is the same as rentMin but with 'No min' removed and additional values added
export const rentMax = rentMin
  .slice(1)
  .concat({ label: 'No max', value: 9999999 });

export const sizeMin = [
  { label: 'No min', value: 0 },
  { label: '500 sq ft', value: 500 },
  { label: '1000 sq ft', value: 1000 },
  { label: '2000 sq ft', value: 2000 },
  { label: '3000 sq ft', value: 3000 },
  { label: '4000 sq ft', value: 4000 },
  { label: '5000 sq ft', value: 5000 },
  { label: '6000 sq ft', value: 6000 },
  { label: '7000 sq ft', value: 7000 },
  { label: '8000 sq ft', value: 8000 },
  { label: '9000 sq ft', value: 9000 },
  { label: '10000 sq ft', value: 10000 },
  { label: '20000 sq ft', value: 20000 },
  { label: '30000 sq ft', value: 30000 },
  { label: '40000 sq ft', value: 40000 },
  { label: '50000 sq ft', value: 50000 },
  { label: '60000 sq ft', value: 60000 },
  { label: '70000 sq ft', value: 70000 },
  { label: '80000 sq ft', value: 80000 },
  { label: '90000 sq ft', value: 90000 },
  { label: '100000 sq ft', value: 100000 }
];

// sizeMax is the same as sizeMin but with 'No min' removed and additional values added
export const sizeMax = sizeMin
  .slice(1)
  .concat({ label: '200000 sq ft', value: 200000 })
  .concat({ label: 'No max', value: 9999999 });
