"use client"
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  value: Date;
  onChange: (date: Date) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ value, onChange }) => {
  return <Calendar onChange={onChange} value={value} />;
};

export default CalendarComponent;
