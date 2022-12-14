import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '../../../test/repositories/InMemoryNotificationRepository';
import { SendNotification } from './SendNotification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Nova solicitação de amizade',
      recipientId: randomUUID(),
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
