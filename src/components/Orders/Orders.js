import OrdersStyles from './Orders.module.css';


function Orders() {
  

  return (
    <section className={OrdersStyles.container}>
      <h2 className={OrdersStyles.title + ' text text_type_main-large mt-10 mb-5'}>Лента заказов</h2>
      <section className={OrdersStyles.feed}>
             
      </section>
      <section className={OrdersStyles.board}>
        <div className={OrdersStyles.done}>
          <h3 className='mb-6'>Готовы:</h3>
          <ul className={OrdersStyles.ordersList}>
            <li className='text text_type_digits-default mb-2'>034533</li>
            <li className='text text_type_digits-default mb-2'>034533</li>
          </ul>
        </div>
        <div className={OrdersStyles.inProgress}>
          <h3 className='mb-6'>В работе:</h3>
          <ul className={OrdersStyles.ordersList}>
            <li className='text text_type_digits-default mb-2'>034533</li>
            <li className='text text_type_digits-default mb-2'>034533</li>
          </ul>
        </div>
        <div className={OrdersStyles.statistics}>
          <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
          <p className={OrdersStyles.ordersNumber + ' text text_type_digits-large'}>28 752</p>
        </div>
        <div className={OrdersStyles.statistics}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={OrdersStyles.ordersNumber + ' text text_type_digits-large'}>138</p>
        </div>
      </section>
    </section>
  );
}

export default Orders;
