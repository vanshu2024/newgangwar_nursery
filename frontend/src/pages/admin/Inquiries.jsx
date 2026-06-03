import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsTrash, BsEnvelope, BsTelephone, BsPerson, BsCalendar } from 'react-icons/bs';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pages: 1 });
  const [page, setPage] = useState(1);

  const fetchInquiries = async () => {
    try {
      const { data } = await API.get(`/inquiries?page=${page}&limit=20`);
      setInquiries(data.inquiries);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await API.delete(`/inquiries/${id}`);
      toast.success('Inquiry deleted');
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to delete inquiry');
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
            <h1 className="text-2xl md:text-3xl font-bold">Customer Inquiries</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{pagination.total} total inquiries</p>
          </div>
          <BsEnvelope className="text-4xl text-primary-600" />
        </div>

        {inquiries.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BsEnvelope className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No inquiries yet</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq._id} className="glass-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BsPerson className="text-primary-600" />
                        <h3 className="font-semibold text-lg">{inq.customerName}</h3>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BsTelephone className="text-green-600" />
                          <a href={`tel:${inq.phone}`} className="hover:text-primary-600">{inq.phone}</a>
                        </span>
                        {inq.email && (
                          <span className="flex items-center gap-1">
                            <BsEnvelope className="text-blue-600" />
                            <a href={`mailto:${inq.email}`} className="hover:text-primary-600">{inq.email}</a>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <BsCalendar className="text-gray-500" />
                          {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {inq.address && <p className="text-sm text-gray-500 mt-1">{inq.address}</p>}
                    </div>
                    <button
                      onClick={() => handleDelete(inq._id)}
                      className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                      title="Delete"
                    >
                      <BsTrash />
                    </button>
                  </div>
                  {(inq.plantName || inq.message) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      {inq.plantName && (
                        <p className="text-sm"><span className="font-medium">Plant:</span> {inq.plantName} {inq.quantity > 1 && `(x${inq.quantity})`}</p>
                      )}
                      {inq.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><span className="font-medium">Message:</span> {inq.message}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
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

export default Inquiries;
