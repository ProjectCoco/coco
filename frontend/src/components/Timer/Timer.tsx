import React from 'react';

interface Prop {
  timer: number;
}

export default function Timer({ timer }: Prop) {
  const HOUR = 60 * 60;
  const minutes = Math.floor((timer % HOUR) / 60);
  const seconds = timer % 60;

  const formatTime = (time: number) =>
    time >= 10 ? time : '0'.concat(time.toString());

  return (
    <span>
      {formatTime(minutes)}:{formatTime(seconds)}
    </span>
  );
}
