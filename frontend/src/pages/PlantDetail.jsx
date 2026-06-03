import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsArrowLeft, BsCheckCircle, BsXCircle, BsWhatsapp, BsTelephone, BsCart3, BsPlus } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const { data } = await API.get(`/plants/${id}`);
        setPlant(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Plant not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/inquiries', {
        ...formData,
        plantName: plant.nameEnglish,
      });
      toast.success('Thank you. Your plant request has been submitted successfully.');
      setShowInquiry(false);
      setFormData({ customerName: '', phone: '', address: '', quantity: 1, message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BsCart3 className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-4">{error || 'Plant not found'}</p>
          <Link to="/plants" className="btn-primary inline-flex items-center gap-2">
            <BsArrowLeft /> Back to Plants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/plants" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
          <BsArrowLeft /> Back to Plants
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              {imgError ? (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <BsCart3 className="text-6xl text-primary-400" />
                </div>
              ) : (
                <img
                  src={plant.image}
                  alt={plant.nameEnglish}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {plant.stockStatus === 'out-of-stock' && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl">
                Out of Stock
              </div>
            )}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {plant.featured && <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 text-sm font-semibold rounded-lg">Featured</span>}
              {plant.bestseller && <span className="px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-lg">Best Seller</span>}
              {plant.newArrival && <span className="px-3 py-1.5 bg-primary-500 text-white text-sm font-semibold rounded-lg">New</span>}
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg mb-4">
              {plant.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {plant.nameEnglish}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-hindi mb-6">
              {plant.nameHindi}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                ₹{plant.price}
              </span>
              <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg ${
                plant.stockStatus === 'in-stock'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
                {plant.stockStatus === 'in-stock' ? <><BsCheckCircle /> In Stock</> : <><BsXCircle /> Out of Stock</>}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {plant.description}
            </p>

            <div className="flex flex-col gap-3">
              {plant.stockStatus === 'in-stock' && (
                <button
                  onClick={() => addToCart(plant)}
                  className="btn-primary text-lg py-4 flex items-center justify-center gap-2"
                >
                  <BsPlus /> Add to Cart - ₹{plant.price}
                </button>
              )}
              <button
                onClick={() => setShowInquiry(true)}
                disabled={plant.stockStatus === 'out-of-stock'}
                className="btn-outline flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50"
              >
                <BsTelephone /> Request this Plant
              </button>
              <a
                href={`https://wa.me/919452437164?text=${encodeURIComponent(`Hi! I am interested in ${plant.nameEnglish} (${plant.nameHindi}) at New Gangwar Nursery.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline dark:border-gray-700 flex items-center justify-center gap-2 text-lg py-4"
              >
                <BsWhatsapp /> Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Inquiry Form Modal */}
        {showInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowInquiry(false)}>
            <div className="glass-card max-w-lg w-full p-8" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-2xl font-bold mb-2">Request Plant</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{plant.nameEnglish} ({plant.nameHindi})</p>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData((p) => ({ ...p, customerName: e.target.value }))}
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData((p) => ({ ...p, quantity: Number(e.target.value) }))}
                  className="input-field"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="input-field resize-none"
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowInquiry(false)} className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="flex-1 btn-primary disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetail;
