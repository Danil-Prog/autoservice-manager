import Header from '../Header/Header';
import PageContainer from '../PageContainer/PageContainer';

import styles from './StaticElements.module.scss';

const StaticElements = () => {
  return (
    <div className={styles.mainContainer}>
      {<Header />}
      <div className={styles.secondContainer}>{<PageContainer />}</div>
    </div>
  );
};

export default StaticElements;
