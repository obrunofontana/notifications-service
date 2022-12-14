import { randomUUID } from 'crypto';
import { Notification } from '../entities/Notification';
import { SendNotification } from './SendNotification';

const notifications: Notification[] = [];

// Mock
const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      category: 'social',
      content: 'Nova solicitação de amizade',
      recipientId: randomUUID(),
    });

    expect(notifications).toHaveLength(1);
  });
});
