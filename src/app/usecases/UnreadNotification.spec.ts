import { makeNotificationFactory } from '@test/factories/NotificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { UnreadNotification } from './UnreadNotification';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotificationFactory({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
