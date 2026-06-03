import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusCircle, BsListUl, BsEnvelope, BsBox, BsPeople, BsExclamationCircle, BsArrowRight, BsFlower1, BsCart3 } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState({ plants: 0, inquiries: 0, outOfStock: 0 });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plantsRes, inquiriesRes] = await Promise.all([
          API.get('/plants?limit=1'),
          API.get('/inquiries?limit=5'),
        ]);
        setStats({
          plants: plantsRes.data.pagination.total,
          inquiries: inquiriesRes.data.pagination.total,
          outOfStock: 0,
        });
        setRecentInquiries(inquiriesRes.data.inquiries);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Plants', value: stats.plants, icon: BsBox, color: 'from-primary-500 to-primary-600' },
    { label: 'Inquiries', value: stats.inquiries, icon: BsEnvelope, color: 'from-orange-500 to-orange-600' },
    { label: 'Out of Stock', value: stats.outOfStock, icon: BsExclamationCircle, color: 'from-red-500 to-red-600' },
    { label: 'Welcome', value: admin?.username || 'Admin', icon: BsPeople, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, <span className="gradient-text">{admin?.username}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your nursery from one place</p>
          </div>
          <BsFlower1 className="text-4xl text-primary-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  <stat.icon className="text-xl" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/plants/add" className="glass-card p-6 flex items-center gap-4 group hover:-translate-y-1">
            <div className="p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 group-hover:scale-110 transition-transform">
              <BsPlusCircle className="text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold">Add New Plant</h3>
              <p className="text-sm text-gray-500">Add plants to your catalog</p>
            </div>
            <BsArrowRight className="ml-auto text-gray-300 group-hover:text-primary-500 transition-colors" />
          </Link>
          <Link to="/admin/plants" className="glass-card p-6 flex items-center gap-4 group hover:-translate-y-1">
            <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 group-hover:scale-110 transition-transform">
              <BsListUl className="text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold">Manage Plants</h3>
              <p className="text-sm text-gray-500">Edit or remove plants</p>
            </div>
            <BsArrowRight className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
          <Link to="/admin/inquiries" className="glass-card p-6 flex items-center gap-4 group hover:-translate-y-1">
            <div className="p-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 group-hover:scale-110 transition-transform">
              <BsEnvelope className="text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold">View Inquiries</h3>
              <p className="text-sm text-gray-500">Check customer requests</p>
            </div>
            <BsArrowRight className="ml-auto text-gray-300 group-hover:text-orange-500 transition-colors" />
          </Link>
          <Link to="/admin/orders" className="glass-card p-6 flex items-center gap-4 group hover:-translate-y-1">
            <div className="p-4 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 group-hover:scale-110 transition-transform">
              <BsCart3 className="text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold">View Orders</h3>
              <p className="text-sm text-gray-500">Manage customer orders</p>
            </div>
            <BsArrowRight className="ml-auto text-gray-300 group-hover:text-green-500 transition-colors" />
          </Link>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View All <BsArrowRight />
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No inquiries yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Plant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inq) => (
                    <tr key={inq._id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                      <td className="py-3 px-4">{inq.customerName}</td>
                      <td className="py-3 px-4">{inq.phone}</td>
                      <td className="py-3 px-4">{inq.plantName || '-'}</td>
                      <td className="py-3 px-4">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
