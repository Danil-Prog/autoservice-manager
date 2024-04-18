import React from 'react';

import Header from '~/components/ordinary/Header/Header';
import Sidebar from '~/components/ordinary/Sidebar';
import PageContainer from '~/components/ordinary/PageContainer/PageContainer';

import styles from './StaticElements.module.scss';

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