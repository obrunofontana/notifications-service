import { randomUUID } from 'crypto';
import { SendNotification } from './SendNotitication';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Nova solicitação de amizade',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
