import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsPencil, BsTrash, BsPlusCircle, BsBox, BsCurrencyRupee } from 'react-icons/bs';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const ManagePlants = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const fetchPlants = async () => {
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append('search', search);
      if (category !== 'all') params.append('category', category);
      const { data } = await API.get(`/plants?${params}`);
      setPlants(data.plants);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to fetch plants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPlants();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    try {
      await API.delete(`/plants/${id}`);
      toast.success('Plant deleted successfully');
      fetchPlants();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete plant');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader size="lg" /></div>;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm mb-2 transition-colors">
              <BsArrowLeft /> Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Manage Plants</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{pagination.total} total plants</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/plants/add')} className="btn-primary flex items-center gap-2">
              <BsPlusCircle /> Add New
            </button>
          </div>
        </div>

        <div className="glass-card p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field flex-1"
            />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="input-field sm:w-48"
            >
              <option value="all">All Categories</option>
              <option value="Indoor Plants">Indoor Plants</option>
              <option value="Outdoor Plants">Outdoor Plants</option>
              <option value="Flowering Plants">Flowering Plants</option>
              <option value="Fruit Plants">Fruit Plants</option>
              <option value="Medicinal Plants">Medicinal Plants</option>
              <option value="Decorative Plants">Decorative Plants</option>
              <option value="Bonsai Plants">Bonsai Plants</option>
              <option value="Seasonal Plants">Seasonal Plants</option>
              <option value="Shade Trees">Shade Trees</option>
              <option value="Hedge Plants">Hedge Plants</option>
            </select>
            <button type="submit" className="btn-primary">Search</button>
          </form>
        </div>

        {plants.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BsBox className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No plants found</p>
            <button onClick={() => navigate('/admin/plants/add')} className="btn-primary inline-flex items-center gap-2">
              <BsPlusCircle /> Add Your First Plant
            </button>
          </div>
        ) : (
          <>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Image</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Name (Hindi / English)</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plants.map((plant) => (
                      <tr key={plant._id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                        <td className="py-3 px-4">
                          <img
                            src={plant.image}
                            alt={plant.nameEnglish}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium">{plant.nameHindi}</p>
                          <p className="text-gray-500 text-xs">{plant.nameEnglish}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{plant.category}</td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1 font-medium">
                            <BsCurrencyRupee className="text-xs" />{plant.price}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            plant.stockStatus === 'in-stock'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {plant.stockStatus === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <div className="flex gap-1 mt-1">
                            {plant.featured && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Featured</span>}
                            {plant.bestseller && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Bestseller</span>}
                            {plant.newArrival && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">New</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admin/plants/edit/${plant._id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition"
                              title="Edit plant"
                            >
                              <BsPencil />
                            </button>
                            <button
                              onClick={() => handleDelete(plant._id, plant.nameEnglish)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                              title="Delete plant"
                            >
                              <BsTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">Page {pagination.current} of {pagination.pages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManagePlants;
