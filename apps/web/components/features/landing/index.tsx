import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from 'public/logo.svg';
import { Button } from 'antd';

import { Text } from '@merch/shared';
import styles from './landing.module.scss';

export default function Landing(): JSX.Element {
  const [secondsStyle, setSecondsStyles] = useState<any>();
  const [minutesStyle, setMinutesStyle] = useState<any>();
  const [hoursStyle, setHoursStyle] = useState<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date(); //object of date()
      const hr = d.getHours();
      const min = d.getMinutes();
      const sec = d.getSeconds();

      const secondsStyle = {
        transform: `rotate(${sec * 6}deg)`,
      };
      setSecondsStyles(secondsStyle);

      const minutesStyle = {
        transform: `rotate(${min * 6}deg)`,
      };

      setMinutesStyle(minutesStyle);

      const hoursStyle = {
        transform: `rotate(${hr * 30}deg)`,
      };

      setHoursStyle(hoursStyle);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.landing}>
      <div className={styles.logo}>
        <Image src={logo} alt="logo of libes ltd" width={32} height={32} />
        <Text className={styles.brandName}>Libes</Text>
      </div>
      <div className={styles.body}>
        <div className={styles.name}>
          <h1 className={styles.title}>Coming Soon</h1>
          <Text className={styles.text}>
            From creators you love and care directly to you.
          </Text>
          <Text className={styles.text}>Love. Care. Fun. Cool.</Text>
        </div>
        <div className={styles.clock}>
          <div className={styles.clockItems}>
            <div className={styles.second} style={secondsStyle}></div>
            <div className={styles.minute} style={minutesStyle}></div>
            <div className={styles.hour} style={hoursStyle}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
        <div className={styles.email}>
          <div
            className={styles.input}
            placeholder="Please enter your email address"
          >
            <input
              className={styles.inputField}
              type="email"
              placeholder="Please enter your email address"
            />
            <Button className={styles.inputButton}>Notify Me</Button>
          </div>
          <Text className={styles.text}>
            -_Notify me when App is launched_-
          </Text>
        </div>
      </div>
    </div>
  );
}
