import { Star } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

interface StoreCardProps {
  store: {
    id: number;
    name: string;
    email: string;
    address: string;
    averageRating: number;
    userRating?: number;
  };
  onRatingUpdate?: () => void;
  showRating?: boolean;
  className?: string;
}

const API_URL = 'http://localhost:5000/api';

const StoreCard: React.FC<StoreCardProps> = ({ 
  store, 
  onRatingUpdate, 
  showRating = true,
  className = '' 
}) => {
  const [rating, setRating] = useState<number | undefined>(store.userRating);
  const [hoveredRating, setHoveredRating] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSubmit = async (newRating: number) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/ratings`, {
        storeId: store.id,
        rating: newRating
      });
      
      setRating(newRating);
      if (onRatingUpdate) {
        onRatingUpdate();
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`card hover:shadow-elevated transition-shadow duration-300 ${className}`}>
      <div className="flex flex-col h-full">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{store.name}</h3>
          <p className="text-gray-500 text-sm truncate">{store.email}</p>
        </div>
        
        <div className="mb-4 grow">
          <p className="text-gray-700">{store.address}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-accent-400 mr-1 fill-current" />
            <span className="font-medium">{store.averageRating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">avg</span>
          </div>
          
          {showRating && (
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-all duration-150 ${
                    (hoveredRating !== undefined ? star <= hoveredRating : star <= (rating || 0))
                      ? 'text-accent-400 fill-current'
                      : 'text-gray-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isSubmitting && handleRatingSubmit(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(undefined)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;