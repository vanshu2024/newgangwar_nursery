import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Plants from './pages/Plants';
import PlantDetail from './pages/PlantDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AddPlant from './pages/admin/AddPlant';
import EditPlant from './pages/admin/EditPlant';
import ManagePlants from './pages/admin/ManagePlants';
import Inquiries from './pages/admin/Inquiries';
import Orders from './pages/admin/Orders';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:id" element={<PlantDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/plants" element={<ProtectedRoute><ManagePlants /></ProtectedRoute>} />
          <Route path="/admin/plants/add" element={<ProtectedRoute><AddPlant /></ProtectedRoute>} />
          <Route path="/admin/plants/edit/:id" element={<ProtectedRoute><EditPlant /></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute><Inquiries /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
