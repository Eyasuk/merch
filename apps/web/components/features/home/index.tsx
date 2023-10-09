import Advert from 'components/modules/advert';
import BestSeller from 'components/modules/bestSeller';

export default function Home(): JSX.Element {
  return (
    <div>
      <Advert />
      <BestSeller />
    </div>
  );
}
