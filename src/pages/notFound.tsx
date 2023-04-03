import NotFoundPageStyles from './notFound.module.css';

import { Link } from 'react-router-dom';

export function NotFoundPage() {
  
  return (
    <div className={NotFoundPageStyles.container}>
      <h1>404</h1>
      <h1>Извините, страница не найдена.</h1>
      <p>Зато у нас можно подкрепиться вкусными <Link to='/'>бургерами</Link></p>
    </div>
  );
}
