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
import { Button } from '@mui/material';
import ru from 'date-fns/locale/ru';
import MainStore from '~/core/stores/Main.store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

interface ICalendarPageProps {
  mainStore: MainStore;
}

const CalendarPage: React.FC<ICalendarPageProps> = ({ mainStore }) => {
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

  console.log('paddedArrays ------->', paddedArrays);

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
                border: '1px solid #000',
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
                    style={{ padding: 10, border: '1px solid #000000', flex: 1, height: 300 }}>
                    {day?.title}
                    {/* Рендерим список релевантных посещений */}
                    {relevantVisits.map((visit, visitIndex) => (
                      <div key={visitIndex}>
                        Client ID: {visit.clientId}, Visit ID: {visit.visitId}, License Plate:{' '}
                        {visit.licencePlate}, Stamp: {visit.stamp}
                      </div>
                    ))}
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

export default inject('mainStore')(observer(CalendarPage));
