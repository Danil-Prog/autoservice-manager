import React from 'react';
import styles from './ClientItem.module.scss';
import { Link } from 'react-router-dom';

interface IClientItemProps {
  item: TClient;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect: (item: TClient) => void;
}

const ClientItem: React.FC<IClientItemProps> = ({ item, isSelected, onSelect }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.style.backgroundColor = 'lightblue';
    } else if (itemRef.current) {
      itemRef.current.style.backgroundColor = '';
    }
  }, [isSelected]);

  return (
    <Link
      to={`/client-main/${item.id}`}
      ref={itemRef}
      onClick={() => onSelect(item)}
      style={{ padding: '10px', cursor: 'pointer', textDecoration: 'none', color: '#000' }}
      className={styles.clientItem}>
      <p style={{ flex: 1, paddingLeft: 5 }}>{item.licencePlate}</p>
      <p>{item.stamp}</p>
      <p>{item.model}</p>
      <p style={{ paddingRight: 5 }}>{item.year}</p>
    </Link>
  );
};

export default ClientItem;
