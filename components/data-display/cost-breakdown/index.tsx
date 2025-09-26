import { useState } from 'react';
import classNames from 'classnames';
import Table from '../table';
import Button from 'components/data-input/button';

import styles from './styles.module.scss';
import ButtonGroup from 'components/data-input/button-group';
import ToggleSwitch from 'components/data-input/toggle-switch';
import { formatNumberForMoney } from 'lib/helpers/format-number-for-cost';

const cx = classNames.bind(styles);
export interface Props extends React.ComponentProps<'table'> {
  /**
   * The rental price of the property per month.
   */
  pricePerMonth?: number;
  /**
   * The business rates of the property per month.
   */
  businessRates?: number;
  /**
   * The service charge of the property per month.
   */
  serviceCharge?: number;
  /**
   * The insurance of the property per month.
   */
  insurance?: number;
  /**
   * Display the cost breakdown in monthly or annual view.
   */
  showMonthly?: boolean;
  /**
   * Display VAT in the cost breakdown.
   * @default false
   */
  withVat?: boolean;
  /**
   * Current VAT rate.
   */
  vatRate: number;
  /**
   * Is the charge a service fee?
   * @default false
   */
  isServiceFee?: boolean;
}

/**
 * The Cost Breakdown Table component displays a table of costs for a property.
 **/
export const CostBreakdown: React.FC<Props> = ({
  pricePerMonth,
  businessRates,
  serviceCharge,
  insurance,
  showMonthly = false,
  withVat = false,
  vatRate,
  isServiceFee,
  ...props
}: Props) => {
  const [showMonthlyView, setShowMonthlyView] = useState(showMonthly);
  const [showVat, setShowVat] = useState(withVat);
  const totalCost =
    (pricePerMonth || 0) +
    (businessRates || 0) +
    (serviceCharge || 0) +
    (insurance || 0);

  const calc_rent = pricePerMonth
    ? showMonthlyView
      ? pricePerMonth
      : pricePerMonth * 12
    : undefined;
  const calc_rates = businessRates
    ? showMonthlyView
      ? businessRates
      : businessRates * 12
    : undefined;
  const calc_service = serviceCharge
    ? showMonthlyView
      ? serviceCharge
      : serviceCharge * 12
    : undefined;
  const calc_insurance = insurance
    ? showMonthlyView
      ? insurance
      : insurance * 12
    : undefined;
  const calc_total = showMonthlyView ? totalCost : totalCost * 12;

  const calculateVAT = (amount: number) => {
    const vatAmount = amount * vatRate;
    return amount + vatAmount;
  };

  const totalVatSum =
    calculateVAT(pricePerMonth || 0) +
    (businessRates || 0) +
    calculateVAT(serviceCharge || 0) +
    calculateVAT(insurance || 0);

  const totalCostWithVat = showMonthlyView ? totalVatSum : totalVatSum * 12;

  return (
    <div className={styles['cost-breakdown']}>
      <div className={styles['tab-bar']}>
        <ButtonGroup collapseSpacing>
          <Button
            onClick={() => setShowMonthlyView(true)}
            className={cx(
              styles['tab-button'],
              showMonthlyView && styles['active']
            )}
            fullWidth
          >
            View monthly
          </Button>
          <Button
            onClick={() => setShowMonthlyView(false)}
            className={cx(
              styles['tab-button'],
              !showMonthlyView && styles['active']
            )}
            fullWidth
          >
            View yearly
          </Button>
        </ButtonGroup>
      </div>
      <Table className={styles['table']} {...props}>
        <Table.Head>
          <Table.Row>
            <Table.Cell th>Cost breakdown</Table.Cell>
            <Table.Cell th>
              <ToggleSwitch
                name="toggle show vat"
                id="toggle"
                stateText={{ on: 'Including VAT', off: 'Excluding VAT' }}
                checked={showVat}
                onChange={() => setShowVat(!showVat)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {calc_rent && (
            <Table.Row>
              <Table.Cell th className={styles['row-th']}>
                Rent
              </Table.Cell>
              <Table.Cell className={styles['row-value']}>
                &pound;
                {formatNumberForMoney(
                  showVat ? calculateVAT(calc_rent) : calc_rent
                )}
              </Table.Cell>
            </Table.Row>
          )}

          <Table.Row>
            <Table.Cell th className={styles['row-th']}>
              Business rates payable
            </Table.Cell>
            <Table.Cell className={styles['row-value']}>
              {calc_rates
                ? `£${formatNumberForMoney(calc_rates)}`
                : 'Call for details'}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell th className={styles['row-th']}>
              Insurance
            </Table.Cell>
            <Table.Cell className={styles['row-value']}>
              {calc_insurance
                ? `£${formatNumberForMoney(
                    showVat ? calculateVAT(calc_insurance) : calc_insurance
                  )}`
                : 'Call for details'}
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell th className={styles['row-th']}>
              Service {isServiceFee ? 'fee' : 'charge'}
            </Table.Cell>
            <Table.Cell className={styles['row-value']}>
              {calc_service
                ? `£${formatNumberForMoney(
                    showVat ? calculateVAT(calc_service) : calc_service
                  )}`
                : 'Call for details'}
            </Table.Cell>
          </Table.Row>

          <Table.Row className={styles['total-row']}>
            <Table.Cell th className={styles['row-th']}>
              Total cost:
            </Table.Cell>
            <Table.Cell className={styles['row-value']}>
              &pound;
              {formatNumberForMoney(showVat ? totalCostWithVat : calc_total)}
            </Table.Cell>
          </Table.Row>
          <Table.Row className={styles['disclaimer-row']}>
            <Table.Cell colSpan={2}>
              Prices are approximate. A full detailed breakdown is available
              upon request.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default CostBreakdown;
