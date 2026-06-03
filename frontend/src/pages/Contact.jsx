import { useState } from 'react';
import { BsTelephone, BsEnvelope, BsGeoAlt, BsWhatsapp, BsSend } from 'react-icons/bs';
import { toast } from 'react-toastify';
import API from '../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    plantName: '',
    quantity: 1,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/inquiries', formData);
      toast.success('Thank you. Your plant request has been submitted successfully.');
      setFormData({ customerName: '', phone: '', email: '', address: '', plantName: '', quantity: 1, message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: BsTelephone, label: 'Phone', value: '9452437164 / 9794942299 / 6393753180', href: 'tel:9452437164' },
    { icon: BsEnvelope, label: 'Email', value: 'vanshikagangwar3@gmail.com', href: 'mailto:vanshikagangwar3@gmail.com' },
    { icon: BsGeoAlt, label: 'Address', value: 'Vill & Post Barjhala, Kaimganj, Farrukhabad, Uttar Pradesh', href: null },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="section-subtitle">We would love to hear from you. Reach out with any questions or inquiries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info) => (
            <div key={info.label} className="glass-card p-6 text-center group hover:-translate-y-1">
              <div className="inline-flex p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <info.icon className="text-2xl" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.label}</h3>
              {info.href ? (
                <a href={info.href} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {info.value}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="customerName" placeholder="Your Name *" required value={formData.customerName} onChange={handleChange} className="input-field" />
                  <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange} className="input-field" />
                </div>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field" />
                <input type="text" name="address" placeholder="Your Address" value={formData.address} onChange={handleChange} className="input-field" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="plantName" placeholder="Plant Name (if any)" value={formData.plantName} onChange={handleChange} className="input-field" />
                  <input type="number" name="quantity" placeholder="Quantity" min="1" value={formData.quantity} onChange={handleChange} className="input-field" />
                </div>
                <textarea name="message" rows={4} placeholder="Your Message" value={formData.message} onChange={handleChange} className="input-field resize-none" />
                <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 disabled:opacity-50">
                  {submitting ? 'Sending...' : <><BsSend /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Visit Our Nursery</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Come and explore our wide variety of plants in person. Our team is ready to help you find the perfect plants for your space.
              </p>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d79.5!3d27.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzAwLjAiTiA3OcKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nursery Location"
                />
              </div>
            </div>

            <div className="glass-card p-8 text-center">
              <BsWhatsapp className="text-4xl text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Chat on WhatsApp</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Have a quick question? Message us on WhatsApp for instant assistance.
              </p>
              <a
                href="https://wa.me/919452437164"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <BsWhatsapp /> Start Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
