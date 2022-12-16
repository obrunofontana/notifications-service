import { makeNotificationFactory } from '@test/factories/NotificationFactory';
import { InMemoryNotificationRepository } from '../../../test/repositories/InMemoryNotificationRepository';
import { CountRecipientNotifications } from './CountRecipientNotifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(makeNotificationFactory());

    await notificationRepository.create(makeNotificationFactory());

    await notificationRepository.create(
      makeNotificationFactory({ recipientId: 'example-recipientId-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-recipientId-1',
    });

    expect(count).toEqual(2);
  });
});
