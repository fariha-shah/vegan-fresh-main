//Taimoor About, contact, blog pages
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 800 000 0000',
    sub: 'Mon-Sat 9am to 6pm',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@veganfresh.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Green Street',
    sub: 'New York, USA',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-bg-light">
      {/* Hero */}
      <section
        className="py-16 px-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #1e7a2e 0%, #2e9e3e 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <Mail size={15} />
            Get In Touch
          </span>
          <h1 className="font-poppins font-black text-white text-[36px] md:text-[50px] leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-white/85 text-[15px] leading-relaxed">
            We would love to hear from you! Send us a message and we will get
            back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CONTACT_INFO.map((info) => (
            <div
              key={info.label}
              className="bg-white rounded-card shadow-card p-6 text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-green-pale flex items-center justify-center mx-auto mb-4">
                <info.icon size={20} className="text-green-primary" />
              </div>
              <h3 className="font-poppins font-bold text-[15px] text-text-dark mb-1">
                {info.label}
              </h3>
              <p className="text-green-primary font-semibold text-[14px]">
                {info.value}
              </p>
              <p className="text-gray-400 text-[12px] mt-1">{info.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-4 px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-card shadow-card p-8">
            <h2 className="font-poppins font-bold text-[22px] text-text-dark mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-pale flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-primary" />
                </div>
                <h3 className="font-poppins font-bold text-[20px] text-text-dark">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-[14px]">
                  We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-2 text-green-primary font-semibold text-[14px] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block font-inter text-[13px] font-medium text-text-dark mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-inter text-[14px] outline-none focus:border-green-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[13px] font-medium text-text-dark mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-inter text-[14px] outline-none focus:border-green-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[13px] font-medium text-text-dark mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-inter text-[14px] outline-none focus:border-green-primary transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 w-full bg-green-primary hover:bg-green-dark text-white font-poppins font-semibold text-[14px] py-3.5 rounded-xl transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-card shadow-card p-6">
              <h2 className="font-poppins font-bold text-[18px] text-text-dark mb-5">
                Find Us Here
              </h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-pale flex items-center justify-center shrink-0">
                      <info.icon size={18} className="text-green-primary" />
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-[13px] text-text-dark">
                        {info.value}
                      </p>
                      <p className="font-inter text-[12px] text-gray-400">
                        {info.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div
              className="rounded-card overflow-hidden shadow-card flex-1"
              style={{ minHeight: '220px' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9!2d-74.0059!3d40.7127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '220px' }}
                allowFullScreen=""
                loading="lazy"
                title="Vegan Fresh Location"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
