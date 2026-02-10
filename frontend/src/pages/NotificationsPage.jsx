import React from 'react';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Briefcase, 
  FileText, 
  AlertCircle, 
  Settings,
  Check,
  CheckCheck,
  Trash2
} from 'lucide-react';

const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'match': return Briefcase;
      case 'application': return FileText;
      case 'alert': return Bell;
      case 'system': return Settings;
      default: return AlertCircle;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'match': return 'bg-primary/10 text-primary';
      case 'application': return 'bg-info/10 text-info';
      case 'alert': return 'bg-warning/10 text-warning';
      case 'system': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleMarkRead = (id) => {
    markNotificationRead(id);
    toast.success('Marked as read');
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                Notifications
              </h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type);
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`transition-colors ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full ${getColor(notification.type)} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                            
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                            )}
                          </div>
                          
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2 h-7 text-xs"
                              onClick={() => handleMarkRead(notification.id)}
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-foreground">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
