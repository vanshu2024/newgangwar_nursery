import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsBox, BsTelephone, BsEnvelope, BsPerson, BsCalendar, BsCurrencyRupee } from 'react-icons/bs';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
};

const statuses = ['pending', 'confirmed', 'delivered', 'cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get(`/orders?page=${page}&limit=20`);
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      toast.success(`Order ${status}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order');
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
            <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{pagination.total} total orders</p>
          </div>
          <BsBox className="text-4xl text-primary-600" />
        </div>

        {orders.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BsBox className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No orders yet</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="glass-card p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BsPerson className="text-primary-600" />
                        <h3 className="font-semibold text-lg">{order.customerName}</h3>
                        <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status]?.color}`}>
                          {statusConfig[order.status]?.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BsTelephone className="text-green-600" />
                          <a href={`tel:${order.phone}`} className="hover:text-primary-600">{order.phone}</a>
                        </span>
                        {order.email && (
                          <span className="flex items-center gap-1">
                            <BsEnvelope className="text-blue-600" />
                            <a href={`mailto:${order.email}`} className="hover:text-primary-600">{order.email}</a>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <BsCalendar className="text-gray-500" />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {order.address && <p className="text-sm text-gray-500 mt-1">{order.address}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      {statuses.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusUpdate(order._id, s)}
                          disabled={order.status === s}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 ${
                            order.status === s
                              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 ring-2 ring-primary-500'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {statusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          {item.image && (
                            <img src={item.image} alt={item.nameEnglish} className="w-10 h-10 object-cover rounded-lg" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{item.nameEnglish}</p>
                            <p className="text-xs text-gray-500">{item.nameHindi} &times; {item.quantity}</p>
                          </div>
                          <span className="font-medium flex items-center gap-0.5">
                            <BsCurrencyRupee className="text-xs" />{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-end gap-1 text-lg font-bold text-primary-600 dark:text-primary-400">
                      <BsCurrencyRupee className="text-sm" />{order.totalAmount}
                    </div>
                  </div>
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

export default Orders;
