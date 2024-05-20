import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths
} from 'date-fns';
import Box from '@mui/material/Box';
import React from 'react';
import { Button, Divider } from '@mui/material';
import ru from 'date-fns/locale/ru';
import MainStore from '~/core/stores/Main.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ClientStore from '~/core/stores/Client.store';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styles from './CalendarPage.module.scss';

interface ICalendarPageProps {
  mainStore: MainStore;
  clientStore: ClientStore;
}

const CalendarPage: React.FC<ICalendarPageProps> = ({ mainStore, clientStore }) => {
  const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  });

  const [formatMonth, setFormatMonth] = React.useState<
    {
      id: number;
      title: string;
      date: string;
    }[]
  >([]);

  const startingDayIndex = getDay(firstDayOfMonth);

  const { receiveCalendarVisits, calendarVisits } = mainStore;
  const { receiveCurrentClient } = clientStore;
  React.useEffect(() => {}, [currentDate]);
  React.useEffect(() => {
    const initialArray = Array.from({ length: startingDayIndex - 1 }, () => ({
      id: 0,
      title: '',
      date: ''
    }));

    setFormatMonth((prevFormatMonth) => [
      ...prevFormatMonth,
      ...initialArray,
      ...daysInMonth.map((day, i) => ({
        id: i + startingDayIndex,
        title: format(day, 'd'),
        date: format(day, 'dd.MM.yyyy')
      }))
    ]);
    receiveCalendarVisits(firstDayOfMonth.toISOString(), lastDayOfMonth.toISOString());
  }, [currentDate]);

  const splitArray = (array: { id: number; title: string; date: string }[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const padArray = (array: { id: number; title: string; date: string }[], divisor: number) => {
    const remainder = array.length % divisor;
    const padding = remainder === 0 ? 0 : divisor - remainder;
    return [...array, ...Array(padding).fill({ id: 0, title: '', date: '' })];
  };

  const splitArrays = splitArray(formatMonth, 7);
  const paddedArrays = splitArrays.map((week) => padArray(week, 7));

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={() => {
            setFormatMonth([]);
            setCurrentDate(subMonths(currentDate, 1));
          }}>
          Prev
        </Button>
        <div style={{ width: 100, textAlign: 'center' }}>
          {format(currentDate, 'LLLL', { locale: ru })}
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setFormatMonth([]);
            setCurrentDate(addMonths(currentDate, 1));
          }}>
          Next
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {WEEKDAYS.map((day) => (
            <div
              key={`nameDay-${day}`}
              style={{
                border: '1px solid #808080FF',
                padding: 10,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
              {day}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {paddedArrays.map((week, i) => (
            <div key={`week-${i}`} style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              {week.map((day: string, index: number) => {
                // Фильтруем элементы из calendarVisits, где visitDate равен day?.date
                const relevantVisits = calendarVisits.filter(
                  (visit) => format(visit.visitDate, 'dd.MM.yyyy') === day.date
                );

                return (
                  <div
                    key={`day-${index}`}
                    style={{ padding: 0, border: '1px solid #808080FF', flex: 1, height: 300 }}>
                    <div className={styles.headerDay}>{day?.title}</div>
                    <Divider color={'#808080'} />
                    {/* Рендерим список релевантных посещений */}
                    <div className={styles.listVisitsInDay}>
                      {relevantVisits.map((visit, visitIndex) => (
                        <Link
                          key={visitIndex}
                          to={`/client-main/${visit.visitId}`}
                          onClick={() => receiveCurrentClient(visit.clientId)}
                          style={{ textDecoration: 'none', color: '#000' }}>
                          <div className={styles.visitDay}>
                            <FiberManualRecordIcon
                              style={{ color: '#328314' }}
                              className={styles.iconIsDone}
                              fontSize="small"
                            />
                            <div className={styles.visitDayInfo}>
                              <div style={{ fontWeight: '600' }}>{visit.licencePlate}</div>
                              <div>Марка: {visit.stamp}</div>
                              <div>Модель: {visit.model}</div>
                            </div>
                            <div style={{ color: '#595959' }}>
                              {format(visit.visitDate, 'HH:mm')}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default inject('mainStore', 'clientStore')(observer(CalendarPage));
