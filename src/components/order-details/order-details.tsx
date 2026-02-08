import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

const TEST_ORDER_NUMBER = 12345;

export const OrderDetails = (): React.JSX.Element => {
  return (
    <div className={styles.order_details}>
      <h3 className="text text_type_digits-large mb-8">{TEST_ORDER_NUMBER}</h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.icon_wrapper}>
        <CheckMarkIcon type="success" />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
