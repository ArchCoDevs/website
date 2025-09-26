import classNames from 'classnames';

import styles from './styles.module.scss';
import Link from 'components/data-display/link';
import { Icon } from 'components/flourishes/icon';

const cx = classNames.bind(styles);

export interface Props extends React.ComponentProps<'section'> {
  /**
   * Telephone number to display.
   */
  tel: string;
  /**
   * Email address to display.
   */
  email: string;
  /**
   * Address to display.
   */
  address: string;
  /**
   * The registration number to display.
   */
  registrationNo: string;
  /**
   * The Latitude of the location.
   */
  lat?: number;
  /**
   * The Longitude of the location.
   */
  lng?: number;
}

/**
 * The Contact Card component displays a map and a set of contact details along with a few call to actions.
 * It is designed to be used inside a container and will expand to fill the available space.
 */
export const ContactCard: React.FC<Props> = ({
  tel,
  email,
  address,
  registrationNo
}: Props) => {
  return (
    <section
      className={cx(styles['contact-card'], classNames)}
      data-testid="contact-card"
    >
      <div className={styles['top']}>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1209.177361804948!2d-0.09563198734076533!3d51.512860823702205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604aa8f0ac5ab%3A0x8ea2730b094d2f8c!2sWatling%20House!5e0!3m2!1sen!2suk!4v1721474776262!5m2!1sen!2suk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={styles['bottom']}>
        <h2 className={styles['title']}>Head office</h2>
        <address className={styles['address']}>{address}</address>
        <div className={styles['buttons']}>
          <Link href={`tel:${tel}`} className={styles['button']}>
            <Icon use="phone" />
            <span>{tel}</span>
          </Link>
          <Link href={`mailto:${email}`} className={styles['button']}>
            <Icon use="address" />
            <span>Email us</span>
          </Link>
          <Link
            href="https://www.google.co.uk/maps/place/33+Cannon+St,+London+EC4M+5SB/@51.5127503,-0.0949291,17z/data=!3m1!4b1!4m6!3m5!1s0x487604aa89208e6f:0x9ed7648de54f9230!8m2!3d51.5127503!4d-0.0949291!16s%2Fg%2F11c2h0ddcr?entry=ttu"
            className={styles['button']}
          >
            <Icon use="map" />
            <span>Google Maps</span>
          </Link>
          <Link
            href="https://tfl.gov.uk/plan-a-journey/?&To=Watling%20House%2C%2033%20Cannon%20Street%2C%20London%2C%20EC4M%205SBN"
            className={styles['tfl-button']}
          >
            <span className={styles['logo']}></span>
            <span className={styles['text']}>Plan a journey</span>
          </Link>
        </div>
        <div>
          <p>
            The Arch Company Properties Limited, as general partner of the Arch
            Company Properties L.P.
          </p>
          <p>
            Registration Number: {registrationNo} <br />
            Registered in England & Wales <br />
            Registered Office: {address}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCard;
