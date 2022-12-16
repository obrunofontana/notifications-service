import { Content } from '@app/entities/Content';
import { Notification } from '@app/entities/Notification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CancelNotification } from './CancelNotification';
import { NotificationNotFound } from './errors/NotificationNotFound';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'example-recipientId',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
