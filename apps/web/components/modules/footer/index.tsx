import Image from 'next/image';
import { Button } from 'antd';
import { Title, Text } from 'components/elements/text';

import styles from './footer.module.scss';

export default function FooterModule(): JSX.Element {
  return (
    <div className={styles.footer}>
      <div className={styles.sections}>
        <div className={styles.column}>
          <Title level={5}>Find Store</Title>
          <Text type="secondary">Find Libes Products Near You</Text>
          <Button type="primary" title="Store Locator">
            Store Locator{' '}
          </Button>
        </div>
        <div className={styles.column}>
          <Title level={5}>Help</Title>
          <Text type="secondary"> Delivery</Text>
          <Text type="secondary">Returns</Text>
          <Text type="secondary">Track an Order</Text>
        </div>
        <div className={styles.column}>
          <Title level={5}>About Us</Title>
          <Text type="secondary">Careers</Text>
          <Text type="secondary">Terms & Condition</Text>
          <Text type="secondary">Privacy Policy</Text>
          <Text type="secondary">Responsibility</Text>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.social_media_icons}>
          <Image
            src="social_media_icons/facebook.svg"
            alt="follow as on facebook"
            height={23}
            width={23}
          />
          <Image
            src="social_media_icons/twitter.svg"
            alt="follow as on twitter"
            height={23}
            width={23}
          />
          <Image
            src="social_media_icons/instagram.svg"
            alt="follow as on instagram"
            height={23}
            width={23}
          />
          <Image
            src="social_media_icons/telegram.svg"
            alt="follow as on telegram"
            height={23}
            width={23}
          />
          <div />
        </div>
        <Text>Libes Ltd @ 2023</Text>
        <div></div>
      </div>
    </div>
  );
}
