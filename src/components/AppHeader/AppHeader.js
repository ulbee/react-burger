// import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AppHeaderStyles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={AppHeaderStyles.header}>
      <div className={AppHeaderStyles.container}>
        <nav>
          <ul className={AppHeaderStyles.menu}>
            <li className={AppHeaderStyles.item}>
              <a href='/' className={AppHeaderStyles.link + ' ' + AppHeaderStyles.active + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default text_color_inactive'}>
                <BurgerIcon type="primary"/>
                Конструктор
              </a>
            </li>
            <li className={AppHeaderStyles.item}>
              <a href='#feed' className={AppHeaderStyles.link + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default text_color_inactive'}>
                <ListIcon type="secondary"/>
                Лента заказов
              </a>
            </li>
          </ul>
        </nav>
        <Logo/>
        <Link to='/profile' state={{from: '/profile'}} className={AppHeaderStyles.link + ' ' + AppHeaderStyles.account + ' pl-5 pt-4 pr-5 pb-4 text text_type_main-default text_color_inactive'}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;