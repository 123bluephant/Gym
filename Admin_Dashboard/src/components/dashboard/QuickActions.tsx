import { Button } from '../ui/Button';
import { FiUserPlus, FiCalendar, FiMail } from 'react-icons/fi';
import { Card } from '../ui/Card';

export const QuickActions = () => {
  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <div className="mt-4 space-y-3">
          <Button variant="primary" fullWidth icon={<FiUserPlus className="mr-2" />}>
            Add New Member
          </Button>
          <Button variant="secondary" fullWidth icon={<FiCalendar className="mr-2" />}>
            Schedule Class
          </Button>
          <Button variant="secondary" fullWidth icon={<FiMail className="mr-2" />}>
            Send Notification
          </Button>
        </div>
      </div>
    </Card>
  );
};