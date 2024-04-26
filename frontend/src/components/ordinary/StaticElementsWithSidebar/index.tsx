import React from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar';
import PageContainer from '../PageContainer/PageContainer';

import styles from './StaticElementsWithSidebar.module.scss';

const StaticElements = () => {
  return (
    <div className={styles.mainContainer}>
      {<Header />}
      <div className={styles.secondContainer}>
        {<Sidebar />}
        {<PageContainer />}
      </div>
    </div>
  );
};

export default StaticElements;
