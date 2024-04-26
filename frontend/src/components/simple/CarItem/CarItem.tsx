import React from 'react';
import styles from './CarItem.module.scss';

interface ICarItemProps {
  item: TCar;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect: (item: TCar) => void;
}

const CarItem: React.FC<ICarItemProps> = ({ item, isSelected, onSelect }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.style.backgroundColor = 'lightblue';
    } else if (itemRef.current) {
      itemRef.current.style.backgroundColor = '';
    }
  }, [isSelected]);

  return (
    <div
      ref={itemRef}
      onClick={() => onSelect(item)}
      style={{ padding: '10px', cursor: 'pointer' }}
      className={styles.carItem}>
      <p style={{ flex: 1, paddingLeft: 5 }}>{item.licencePlate}</p>
      <p>{item.stamp}</p>
      <p>{item.model}</p>
      <p style={{ paddingRight: 5 }}>{item.year}</p>
    </div>
  );
};

export default CarItem;
