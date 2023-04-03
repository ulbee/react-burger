import { FC } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import AppHeaderStyles from './AppHeader.module.css';

const AppHeader: FC = () => {
  const active = AppHeaderStyles.link + ' ' + AppHeaderStyles.active + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default';
  const link = AppHeaderStyles.link + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default text_color_inactive';
  const activeAccountLink = AppHeaderStyles.link + ' ' + AppHeaderStyles.active + ' ' + AppHeaderStyles.account + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default';
  const accountLink = AppHeaderStyles.link + ' ' + AppHeaderStyles.account + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default text_color_inactive';

  return (
    <header className={AppHeaderStyles.header}>
      <div className={AppHeaderStyles.container}>
        <nav>
          <ul className={AppHeaderStyles.menu}>
            <li className={AppHeaderStyles.item}>
              <NavLink to='/' className={({ isActive }) => isActive ? active : link}>
                <BurgerIcon type="secondary"/>
                Конструктор
              </NavLink>
            </li>
            <li className={AppHeaderStyles.item}>
              <NavLink to='/feed' className={({ isActive }) => isActive ? active : link}>
                <ListIcon type="secondary"/>
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to='/'>
          <Logo/>
        </NavLink>
        <NavLink to='/profile' state={{from: '/profile'}} className={({ isActive }) => isActive ? activeAccountLink : accountLink}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
