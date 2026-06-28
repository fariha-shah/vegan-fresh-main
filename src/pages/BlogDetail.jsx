import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOGS } from '../data/data';

const BlogDetail = () => {
  const { id } = useParams();

  const blog = BLOGS.find((b) => b.id === Number(id));
  const currentIndex = BLOGS.findIndex((b) => b.id === Number(id));

  const prevBlog = BLOGS[currentIndex - 1];
  const nextBlog = BLOGS[currentIndex + 1];

  if (!blog) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link
          to="/blog"
          className="text-green-primary mt-3 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-light">
      {/* Hero Image */}
      <section className="max-w-2xl mx-auto px-6 pt-10">
        <div className="rounded-card overflow-hidden shadow-card">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 md:h-72 object-contain bg-white"
          />
        </div>
      </section>

      {/* Title Section */}
      <section className="text-center py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-1.5 rounded-full mb-4"
            style={{
              backgroundColor: blog.tagColor,
              color: blog.tagText,
            }}
          >
            <Tag size={11} />
            {blog.tag}
          </span>

          <h1 className="font-poppins font-black text-[30px] md:text-[42px] mb-4">
            {blog.title}
          </h1>

          <div className="flex justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <User size={14} />
              Author
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {blog.date}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-card shadow-card p-8 space-y-6">
          {blog.content.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 bg-green-primary text-white flex items-center justify-center rounded-full font-bold text-sm">
                {i + 1}
              </div>

              <div>
                <h3 className="font-bold mb-1">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between mt-8 flex-wrap gap-4">
          {prevBlog ? (
            <Link
              to={`/blog/${prevBlog.id}`}
              className="text-sm font-semibold text-green-primary"
            >
              <ArrowLeft size={16} /> {prevBlog.title.slice(0, 30)}...
            </Link>
          ) : (
            <div />
          )}

          {nextBlog ? (
            <Link
              to={`/blog/${nextBlog.id}`}
              className="text-sm font-semibold text-green-primary"
            >
              {nextBlog.title.slice(0, 30)}... <ArrowRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back */}
        <div className="text-center mt-8">
          <Link to="/blog" className="text-green-primary font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
