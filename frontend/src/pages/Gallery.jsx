import { useState, useEffect } from 'react';
import { BsX, BsChevronLeft, BsChevronRight, BsGrid3X3 } from 'react-icons/bs';
import API from '../api/axios';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', category: 'Nursery', title: 'Our Nursery' },
  { src: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80', category: 'Indoor', title: 'Indoor Plants' },
  { src: 'https://images.unsplash.com/photo-1470058869958-2a3ade48a1f3?w=600&q=80', category: 'Outdoor', title: 'Outdoor Garden' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80', category: 'Flowers', title: 'Flowering Plants' },
  { src: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80', category: 'Indoor', title: 'Green Corner' },
  { src: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', category: 'Nursery', title: 'Plant Collection' },
  { src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', category: 'Flowers', title: 'Beautiful Blooms' },
  { src: 'https://images.unsplash.com/photo-1557180295-76aea20af816?w=600&q=80', category: 'Outdoor', title: 'Garden Setup' },
  { src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80', category: 'Bonsai', title: 'Bonsai Art' },
  { src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80', category: 'Fruits', title: 'Fruit Plants' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', category: 'Indoor', title: 'Modern Indoor' },
  { src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80', category: 'Nursery', title: 'Growing Space' },
  { src: 'https://images.unsplash.com/photo-1557803178-1e7e0a4e0f6d?w=600&q=80', category: 'Outdoor', title: 'Landscape' },
  { src: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&q=80', category: 'Medicinal', title: 'Medicinal Herbs' },
  { src: 'https://images.unsplash.com/photo-1591857177580-dc82b9acb578?w=600&q=80', category: 'Flowers', title: 'Colorful Garden' },
  { src: 'https://images.unsplash.com/photo-1545165375-2c7e4afa6cb0?w=600&q=80', category: 'Bonsai', title: 'Miniature Bonsai' },
  { src: 'https://images.unsplash.com/photo-1520412099551-62b837b6cba3?w=600&q=80', category: 'Indoor', title: 'Succulent Corner' },
  { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80', category: 'Outdoor', title: 'Garden Pathway' },
  { src: 'https://images.unsplash.com/photo-1567095761054-7a02e69aaedd?w=600&q=80', category: 'Nursery', title: 'Greenhouse View' },
  { src: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=600&q=80', category: 'Flowers', title: 'Tulip Garden' },
  { src: 'https://images.unsplash.com/photo-1512436991641-6748430a58ad?w=600&q=80', category: 'Fruits', title: 'Citrus Grove' },
  { src: 'https://images.unsplash.com/photo-1592155931584-901ac15763e6?w=600&q=80', category: 'Medicinal', title: 'Herbal Garden' },
  { src: 'https://images.unsplash.com/photo-1509420316987-d27b02b81c37?w=600&q=80', category: 'Nursery', title: 'Morning Sunshine' },
  { src: 'https://images.unsplash.com/photo-1589923188900-85bae13f5e1a?w=600&q=80', category: 'Bonsai', title: 'Juniper Bonsai' },
  { src: 'https://images.unsplash.com/photo-1547044542-8274f0e0e006?w=600&q=80', category: 'Indoor', title: 'Tropical Vibes' },
];

const categories = ['All', 'Nursery', 'Indoor', 'Outdoor', 'Flowers', 'Bonsai', 'Fruits', 'Medicinal'];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(-1);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % filtered.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === -1) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">
            Our <span className="gradient-text">Gallery</span>
          </h1>
          <p className="section-subtitle">Explore our beautiful collection of plants and nursery moments</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <BsGrid3X3 className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No images found in this category</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((image, index) => (
              <div
                key={index}
                className="masonry-item cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold">{image.title}</p>
                      <p className="text-white/70 text-sm">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-3 text-white/70 hover:text-white transition-colors z-10">
            <BsX className="text-3xl" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-3 text-white/70 hover:text-white transition-colors z-10">
            <BsChevronLeft className="text-3xl" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-3 text-white/70 hover:text-white transition-colors z-10">
            <BsChevronRight className="text-3xl" />
          </button>
          <img
            src={filtered[lightboxIndex].src}
            alt={filtered[lightboxIndex].title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-center text-white/70 text-sm">
            {filtered[lightboxIndex].title} ({lightboxIndex + 1} / {filtered.length})
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
