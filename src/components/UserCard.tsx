import { User, Store, Mail, MapPin, UserCog } from 'lucide-react';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    role: string;
    storeRating?: number;
  };
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, className = '' }) => {
  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin':
        return <UserCog className="h-5 w-5 text-primary-500" />;
      case 'store-owner':
        return <Store className="h-5 w-5 text-secondary-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case 'admin':
        return 'System Administrator';
      case 'store-owner':
        return 'Store Owner';
      default:
        return 'Normal User';
    }
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'admin':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'store-owner':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`card hover:shadow-elevated transition-shadow duration-300 ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor()}`}>
            {getRoleIcon()}
            <span className="ml-1">{getRoleLabel()}</span>
          </span>
        </div>
        
        <div className="space-y-2 mb-4 grow">
          <div className="flex items-center text-gray-700">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-start text-gray-700">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
            <span>{user.address}</span>
          </div>
        </div>
        
        {user.role === 'store-owner' && user.storeRating !== undefined && (
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <Store className="h-4 w-4 mr-2 text-secondary-500" />
              <span className="text-gray-700">Store Rating:</span>
              <span className="ml-2 font-medium">{user.storeRating.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;