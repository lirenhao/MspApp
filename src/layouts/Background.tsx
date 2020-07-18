import React from 'react';
import moment from 'moment';
import day from '../assets/backgroundDay.jpg';
import night from '../assets/backgroundNight.jpg';

const curIsDay = function () {
  const format = 'hh:mm:ss'
  const time = moment(),
    beforeTime = moment('08:00:00', format),
    afterTime = moment('18:00:00', format);
  console.log(time)
  return time.isBetween(beforeTime, afterTime);
}

const Background: React.FC = props => {

  const [isDay, setIsDay] = React.useState<Boolean>(curIsDay());

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDay(curIsDay());
    }, 1000 * 60 * 10);

    return () => clearTimeout(timeout);
  }, []);

  const background = {
    backgroundImage: `url(${isDay ? day : night})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
  }

  return (
    <div style={background}>
      {props.children}
    </div>
  )
}

export default Background;