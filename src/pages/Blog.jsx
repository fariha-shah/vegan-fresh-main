import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { BLOGS } from '../data/data';

const Blog = () => {
  return (
    <main className="min-h-screen bg-bg-light">
      {/* Hero Section */}
      <section
        className="py-16 px-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #1e7a2e 0%, #2e9e3e 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <BookOpen size={15} />
            Our Blog
          </span>

          <h1 className="font-poppins font-black text-white text-[36px] md:text-[50px] leading-tight mb-4">
            Health Tips & Recipes
          </h1>

          <p className="text-white/85 text-[15px] leading-relaxed">
            Discover health tips, recipes and farming insights from Vegan Fresh.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {BLOGS.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-hover hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tag + Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: blog.tagColor,
                        color: blog.tagText,
                      }}
                    >
                      <Tag size={10} />
                      {blog.tag}
                    </span>

                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar size={11} />
                      {blog.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-poppins font-bold text-[18px] text-text-dark mb-3 leading-snug">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-[14px] leading-relaxed flex-1 mb-5">
                    {blog.excerpt}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blog/${blog.id}`}
                    className="flex items-center gap-2 text-green-primary font-semibold hover:gap-3 transition-all duration-300 w-fit"
                  >
                    Read More
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
