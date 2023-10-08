import Advert from 'components/modules/advert';
import BestSeller from 'components/modules/bestSellerSection';

export default function Home(): JSX.Element {
  return (
    <div>
      <Advert />
      <BestSeller />
    </div>
  );
}
