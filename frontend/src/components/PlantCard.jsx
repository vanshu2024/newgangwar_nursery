import { Link } from 'react-router-dom';
import { BsStarFill, BsCart3, BsCheckCircle, BsXCircle, BsPlus } from 'react-icons/bs';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const PlantCard = ({ plant }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group glass-card overflow-hidden hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Link to={`/plants/${plant._id}`}>
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
              <BsCart3 className="text-4xl text-primary-400" />
            </div>
          ) : (
            <img
              src={plant.image}
              alt={plant.nameEnglish}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {plant.featured && (
            <span className="px-2.5 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-lg shadow-lg">
              <BsStarFill className="inline mr-1 -mt-0.5" />
              Featured
            </span>
          )}
          {plant.bestseller && (
            <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-lg shadow-lg">
              Best Seller
            </span>
          )}
          {plant.newArrival && (
            <span className="px-2.5 py-1 bg-primary-500 text-white text-xs font-semibold rounded-lg shadow-lg">
              New
            </span>
          )}
        </div>

        {plant.stockStatus === 'out-of-stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-lg">
          {plant.category}
        </span>

        <Link to={`/plants/${plant._id}`}>
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {plant.nameEnglish}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-hindi">
            {plant.nameHindi}
          </p>
        </Link>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {plant.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ₹{plant.price}
          </span>
          <span className={`flex items-center gap-1 text-xs font-medium ${
            plant.stockStatus === 'in-stock' ? 'text-green-600 dark:text-green-400' : 'text-red-500'
          }`}>
            {plant.stockStatus === 'in-stock' ? (
              <><BsCheckCircle /> In Stock</>
            ) : (
              <><BsXCircle /> Out of Stock</>
            )}
          </span>
        </div>

        {plant.stockStatus === 'in-stock' && (
          <button
            onClick={() => addToCart(plant)}
            className="mt-4 w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2"
          >
            <BsPlus /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default PlantCard;
