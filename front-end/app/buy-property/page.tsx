
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useContractWrite, useAccount } from 'wagmi';
import { contractAddress, contractAbi } from '@/app/config';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const BuyProperty = () => {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const [asset, setAsset] = useState<any>(null);

  const { write: buyRealEstate } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: contractAbi,
    functionName: 'buyRealEstate',
  });

  useEffect(() => {
    const assetString = searchParams.get('asset');
    if (assetString) {
      setAsset(JSON.parse(assetString));
    }
  }, [searchParams]);

  const handlePurchase = () => {
    if (asset) {
      buyRealEstate({
        args: [asset.id, asset.owner],
        from: address,
      });
    }
  };

  if (!asset) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-28 px-4 py-8 sm:pt-36 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Confirm Purchase</h1>
          <div className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">{asset.type === 'Land' ? `${asset.state}, ${asset.city}` : asset.name}</h2>
            <p className="text-lg text-gray-400 mb-4">Owned by: {asset.owner}</p>
            <p className="text-2xl font-bold text-green-400 mb-8">${asset.type === 'Land' ? asset.pricePerPlot?.toLocaleString() : asset.price?.toLocaleString()}</p>
            <button
              onClick={handlePurchase}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg"
            >
              Confirm and Buy
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyProperty;
