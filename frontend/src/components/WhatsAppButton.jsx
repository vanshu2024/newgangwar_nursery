import { BsWhatsapp } from 'react-icons/bs';

const WHATSAPP_NUMBER = '919452437164';
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I would like to know more about plants at New Gangwar Nursery.');

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-110 animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <BsWhatsapp className="text-2xl" />
    </a>
  );
};

export default WhatsAppButton;
