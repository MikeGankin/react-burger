import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber?: number;
  isLoading?: boolean;
  error?: string | null;
};

export const OrderDetails = ({
  orderNumber,
  isLoading = false,
  error = null,
}: TOrderDetailsProps): React.JSX.Element => {
  if (isLoading) {
    return (
      <div className={styles.order_details}>
        <h3 className="text text_type_main-medium mb-8">Оформляем заказ...</h3>
        <p className="text text_type_main-default text_color_inactive">
          Пожалуйста, подождите
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.order_details}>
        <h3 className="text text_type_main-medium mb-8">Не удалось оформить заказ</h3>
        <p className="text text_type_main-default text_color_inactive">{error}</p>
      </div>
    );
  }

  if (!orderNumber) {
    return (
      <div className={styles.order_details}>
        <h3 className="text text_type_main-medium mb-8">Ожидаем номер заказа...</h3>
        <p className="text text_type_main-default text_color_inactive">
          Обновляем данные
        </p>
      </div>
    );
  }

  return (
    <div className={styles.order_details}>
      <h3 className="text text_type_digits-large mb-8">{orderNumber}</h3>
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
