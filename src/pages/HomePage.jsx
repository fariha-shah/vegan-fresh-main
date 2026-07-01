//Wajeeha Home page,setup
import Hero from '../components/home/Hero';
import Categories from '../components/home/categories';
import Products from '../components/home/Products';
import Deals from '../components/home/deals';

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Products />
      <Deals />
    </main>
  );
};

export default Homepage;
