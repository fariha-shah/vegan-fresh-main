//Wajeeha Home page,setup
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../assets/data';
import branchImg from '../../assets/images/branch.png';
const Categories = () => {
  return (
    <section className="relative bg-bg-light py-16 px-5 text-center overflow-visible">
      {/* Decorative Branches */}
      <img
        src={branchImg}
        alt="Left Branch"
        className="absolute top-60 left-0 w-[380px] md:w-[440px] lg:w-[800px] -translate-y-1/2 pointer-events-none z-20"
      />

      <img
        src={branchImg}
        alt="Right Branch"
        className="absolute top-60 right-0 w-[380px] md:w-[440px] lg:w-[800px] -translate-y-1/2 pointer-events-none z-20"
        style={{ transform: 'translateY(-50%) scaleX(-1)' }}
      />
      <h2 className="font-poppins font-bold text-[28px] md:text-[40px] text-green-dark mb-3">
        Vegetables Delivered Daily
      </h2>
      <p className="text-gray-500 text-[15px] max-w-[560px] mx-auto mb-10 leading-relaxed">
        Healthy, farm fresh vegetables and fruits straight from local farms to
        your kitchen. Enjoy natural taste, better nutrition, and fast delivery
        at affordable prices.
      </p>
    </section>
  );
};

export default Categories;
