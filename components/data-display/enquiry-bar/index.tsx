import Button from 'components/data-input/button';

import styles from './styles.module.scss';
import { NextRouter } from 'next/router';

export type Props = {
  enquiryList: string[];
  router: NextRouter;
};

export const EnquiryBar: React.FC<Props> = ({ enquiryList, router }) => {
  return (
    <div className={styles['enquiry-bar']}>
      <p>
        You have selected {enquiryList.length}{' '}
        {enquiryList.length > 1 ? 'properties' : 'property'} for enquiry.
      </p>
      <Button
        variant="primary"
        label="Enquire about selected properties"
        onClick={() => {
          router.push(
            `/properties/enquiry?properties=${enquiryList.join(',')}`
          );
        }}
      />
    </div>
  );
};
