import React, { useEffect, useState } from 'react';
import { useCountdown } from './useCountdown';
import './countDown.css'



const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
      <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p>{value}</p>
        <span>{type}</span>
      </div>
    );
  };

const ExpiredNotice = () => {
  const [expiredTime,setExpiredTime]=useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if(expiredTime>=0){
        setExpiredTime(expiredTime - 1);
        // alert(expiredTime)
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [expiredTime]);

  return (
      <div>
    {expiredTime>0 && 
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>sorry, the offer is already gone</p>
      </div>
    }
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </a>
    </div>
  );
};


const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;