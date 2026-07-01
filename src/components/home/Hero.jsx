//Wajeeha Home page,setup
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { CATEGORIES } from '../../assets/data';
import vegImage from '../../assets/images/veg.png';
import heroBg from '../../assets/images/hero_bg.png';

const Hero = () => {
  const categoryPills = CATEGORIES.slice(0, 5);

  return (
    <section
      className="relative min-h-[100vh] overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Sun glow */}
      <div
        className="absolute top-44 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,230,100,0.55) 0%, rgba(255,230,100,0) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-4 pt-[50px] w-full">
        {/* Stacked headline */}
        <div className="text-center leading-none">
          <h1
            className="font-poppins font-black text-[80px] md:text-[100px] lg:text-[120px] leading-none"
            style={{ color: '#5F9349' }}
          >
            FRESH
          </h1>
          <h1
            className="font-poppins font-black -mt-4 md:-mt-8 text-[90px] md:text-[140px] lg:text-[180px] leading-none"
            style={{ color: '#9BC886' }}
          >
            ORGANIC
          </h1>
        </div>

        {/* Vegetable image */}
        <div className="-mt-32 md:-mt-56 lg:-mt-72 z-20">
          <img
            src={vegImage}
            alt="Fresh organic vegetables"
            className="w-[300px] md:w-[520px] lg:w-[660px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Category pills */}
        <div className="z-30 -mt-4 md:-mt-8 mb-6 md:mb-10 w-full flex justify-center px-10">
          <div className="bg-white/70 backdrop-blur-lg rounded-[28px] px-5 py-4 shadow-card flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            {categoryPills.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-card flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1"
                  style={{ backgroundColor: cat.color }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-9 h-9 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <span className="font-poppins text-[11px] md:text-xs font-semibold text-green-dark text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
