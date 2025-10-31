import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Bed, Bath, CheckCircle, Shield, Home } from 'lucide-react';
import Image from 'next/image';

interface Asset {
  id: number;
  type: 'Property' | 'Land';
  isVerified: boolean;
  forSale: boolean;
  imageCID?: string;
  name?: string;
  numberOfPlots?: number;
  titleNumber?: number;
  state?: string;
  lga?: string;
  city?: string;
  pricePerPlot?: number;
  coFoCID?: string;
  landIndex?: number;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  price?: number;
  owner?: string;
}

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onPurchase: (asset: Asset) => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, asset, onPurchase }) => {
  if (!asset) return null;

  const renderDetail = (icon: React.ReactNode, label: string, value: string | number | undefined) => (
    <div className="flex items-center gap-3 bg-gray-800/60 p-3 rounded-lg">
      <div className="text-blue-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-900/80 border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image 
                src={asset.imageCID || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                alt={asset.type} 
                className="w-full h-64 object-cover" 
                width={1260} 
                height={750} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={onClose}
                className="absolute top-4 right-4 text-white transition-colors"
              >
                <X size={28} />
              </motion.button>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-4xl font-bold text-white">{asset.type === 'Land' ? `${asset.state}, ${asset.city}` : asset.name}</h2>
                <p className="text-gray-300 flex items-center gap-2 text-lg"><MapPin size={20} /> {asset.type === 'Land' ? asset.lga : `${asset.numberOfRooms} rooms, ${asset.numberOfBathrooms} baths`}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-green-400">${asset.type === 'Land' ? asset.pricePerPlot?.toLocaleString() : asset.price?.toLocaleString()}</span>
                <div className="flex items-center gap-3">
                  {asset.isVerified ? (
                    <span className="flex items-center gap-2 text-green-400 bg-green-500/20 px-3 py-1 rounded-full"><CheckCircle size={16} /> Verified</span>
                  ) : (
                    <span className="flex items-center gap-2 text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full"><Shield size={16} /> Unverified</span>
                  )}
                  <span className={`px-3 py-1 rounded-full ${asset.forSale ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>
                    {asset.forSale ? 'For Sale' : 'Not for Sale'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {asset.type === 'Land' ? (
                  <>
                    {renderDetail(<Home />, 'Number of Plots', asset.numberOfPlots)}
                    {renderDetail(<Home />, 'Title Number', asset.titleNumber)}
                    {renderDetail(<MapPin />, 'State', asset.state)}
                    {renderDetail(<MapPin />, 'LGA', asset.lga)}
                    {renderDetail(<MapPin />, 'City', asset.city)}
                    {renderDetail(<DollarSign />, 'Price Per Plot', asset.pricePerPlot)}
                  </>
                ) : (
                  <>
                    {renderDetail(<Bed />, 'Rooms', asset.numberOfRooms)}
                    {renderDetail(<Bath />, 'Bathrooms', asset.numberOfBathrooms)}
                    {renderDetail(<Home />, 'Land Index', asset.landIndex)}
                  </>
                )}
              </div>

              <p className="text-gray-400 mb-6">Owned by: <span className="font-semibold text-gray-200">{asset.owner}</span></p>

              {asset.forSale && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPurchase(asset)}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg"
                >
                  Purchase Asset
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;