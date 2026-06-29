import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import womanImg from '../../assets/images/banner.png';
import farmBg from '../../assets/images/grass.png';
import bagBg from '../../assets/images/bag.png';
import logo from '../../assets/images/logo.png';
import branchImg from '../../assets/images/branch.png';
import landscapeBg from '../../assets/images/landscape.png';

// ── Circle layout math ──────────────────────────────────────────────
// Each circle is placed using an angle + radius around one fixed center
// point, which now lives INSIDE the bag's own container (see below).
// That means wherever the bag div moves, the circles move with it —
// no more manual re-syncing needed.
const RADIUS = 230; // distance (px) from bag center to each circle — increased so circles sit further from the bag
const CIRCLE_SIZE = 92; // px

const FEATURE_LABELS = [
  '100% Organic',
  'Healthy & Natural',
  'Farm Fresh Daily',
  'Fresh From Farms',
  'Green Life Style',
  'Pure Green Goodness',
];

// Angles in degrees, 0° = right, 90° = straight up, going counter-clockwise.
// Symmetric pairs spread across the top arc (matches the reference design).
const ANGLES = [110, 70, 165, 15, 205, -25];

const FEATURE_CIRCLES = FEATURE_LABELS.map((label, i) => {
  const rad = (ANGLES[i] * Math.PI) / 180;
  return {
    label,
    x: Math.cos(rad) * RADIUS,
    y: -Math.sin(rad) * RADIUS,
    delay: i * 0.25,
  };
});

const Deals = () => {
  return (
    <>
      {/* Freshness You Can Trust Banner */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '380px' }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${farmBg})` }}
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(90deg, rgba(20,80,30,0.82) 0%, rgba(20,80,30,0.65) 40%, rgba(20,80,30,0.15) 70%, rgba(20,80,30,0.0) 100%)',
          }}
        />
        <div
          className="relative z-10 w-full flex flex-row items-center justify-between"
          style={{ minHeight: '380px' }}
        >
          <div className="flex-1 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-12">
            <h2
              className="font-poppins font-black text-white leading-[1.05] mb-5 drop-shadow-lg"
              style={{ fontSize: 'clamp(38px, 5vw, 70px)' }}
            >
              Freshness
              <br />
              You Can Trust
            </h2>
            <p className="text-white/85 text-[15px] mb-8 max-w-[380px] leading-relaxed drop-shadow">
              Handpicked organic vegetables grown naturally without harmful
              chemicals.
            </p>
            <Link
              to="/about"
              className="inline-block font-poppins font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 w-fit shadow-lg"
              style={{ backgroundColor: '#5cb85c', color: 'white' }}
            >
              Explore More
            </Link>
          </div>
          {/* Right — Girl image */}
          <div
            className="relative flex-shrink-0 self-end"
            style={{ marginRight: '0px', marginBottom: '-20px' }}
          >
            <img
              src={womanImg}
              alt="Fresh vegetables"
              className="object-contain object-bottom block"
              style={{
                width: 'clamp(320px, 42vw, 620px)',
                maxHeight: '500px',
                marginTop: '-85px',
              }}
            />
          </div>
        </div>
      </section>

      {/* Decorative Branches Between Sections */}
      <section className="relative h-28 bg-[#c9ebfd]">
        <img
          src={branchImg}
          alt="Left Branch"
          className="absolute left-0 top-1 w-[380px] md:w-[440px] lg:w-[800px] z-30 pointer-events-none"
        />
        <img
          src={branchImg}
          alt="Right Branch"
          className="absolute right-0 top-1 w-[380px] md:w-[440px] lg:w-[800px] z-30 pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />
      </section>

      {/* Why Choose — Full Background Image + Circles + Bag */}
      <section
        className="relative w-full overflow-hidden flex flex-col items-center justify-center pb-0 mb-0"
        // NAYA
        style={{
          minHeight: '750px',
          backgroundImage: `url(${landscapeBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Sky Blue Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(135,206,250,0.45) 0%, rgba(173,216,230,0.25) 35%, rgba(255,255,255,0) 65%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 flex items-end justify-center pt-40 pb-10">
          <di
            className="absolute left-1/2 pointer-events-none"
            style={{ top: '50%', width: 0, height: 0 }}
          >
            {/* Decorative ring connecting the circles */}
            <div
              className="absolute rounded-full border border-green-dark/30"
              style={{
                width: RADIUS * 2,
                height: RADIUS * 2,
                left: -RADIUS,
                top: -RADIUS,
              }}
            />

            {/* Circles — each placed at (x, y) from the center point */}
            {FEATURE_CIRCLES.map((circle) => (
              <motion.div
                key={circle.label}
                className="absolute flex items-center justify-center text-center rounded-full bg-gradient-to-b from-yellow-100 to-yellow-200 shadow-card px-2 pointer-events-auto"
                style={{
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  left: circle.x - CIRCLE_SIZE / 2,
                  top: circle.y - CIRCLE_SIZE / 2,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: circle.delay,
                }}
              >
                <span className="font-poppins font-bold text-green-dark text-[11px] leading-tight">
                  {circle.label}
                </span>
              </motion.div>
            ))}
          </di>

          {/* Bag image itself */}
          <img
            src={bagBg}
            alt="Vegan Fresh tote bag"
            className="relative z-10 object-contain drop-shadow-2xl"
            style={{ width: 'clamp(400px, 40vw, 450px)' }}
          />
          {/* Logo overlaid on the front of the bag */}
          <img
            src={logo}
            alt="The Vegan logo"
            className="absolute z-10 object-contain drop-shadow-md"
            style={{
              width: 'clamp(90px, 9vw, 130px)',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Deals;
