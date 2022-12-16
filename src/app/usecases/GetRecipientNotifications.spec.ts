import { makeNotificationFactory } from '@test/factories/NotificationFactory';
import { InMemoryNotificationRepository } from '../../../test/repositories/InMemoryNotificationRepository';
import { GetRecipientNotifications } from './GetRecipientNotifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(makeNotificationFactory());
    await notificationRepository.create(makeNotificationFactory());
    await notificationRepository.create(
      makeNotificationFactory({ recipientId: 'example-recipientId-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipientId-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipientId-1' }),
        expect.objectContaining({ recipientId: 'example-recipientId-1' }),
      ]),
    );
  });
});
