import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const categories = [
  'Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Fruit Plants',
  'Medicinal Plants', 'Decorative Plants', 'Bonsai Plants', 'Seasonal Plants',
  'Shade Trees', 'Hedge Plants',
];

const EditPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nameHindi: '',
    nameEnglish: '',
    category: '',
    price: '',
    description: '',
    stockStatus: 'in-stock',
    featured: false,
    bestseller: false,
    newArrival: false,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const { data } = await API.get(`/plants/${id}`);
        setFormData({
          nameHindi: data.nameHindi,
          nameEnglish: data.nameEnglish,
          category: data.category,
          price: data.price,
          description: data.description,
          stockStatus: data.stockStatus,
          featured: data.featured,
          bestseller: data.bestseller,
          newArrival: data.newArrival,
        });
        setPreview(data.image);
      } catch (err) {
        toast.error('Failed to fetch plant');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) data.append('image', image);

      await API.put(`/plants/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Plant updated successfully!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update plant');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader size="lg" /></div>;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Edit Plant</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update plant details</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hindi Name *</label>
              <input type="text" name="nameHindi" value={formData.nameHindi} onChange={handleChange} required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">English Name *</label>
              <input type="text" name="nameEnglish" value={formData.nameEnglish} onChange={handleChange} required className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="input-field resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="input-field" />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 h-40 w-40 object-cover rounded-xl" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Status</label>
            <select name="stockStatus" value={formData.stockStatus} onChange={handleChange} className="input-field">
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Best Seller</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">New Arrival</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => navigate('/admin')} className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlant;
