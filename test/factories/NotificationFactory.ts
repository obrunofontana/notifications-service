import { Content } from '@app/entities/Content';
import { Notification, NotificationProps } from '@app/entities/Notification';

type Override = Partial<NotificationProps>;

export function makeNotificationFactory(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova notificação recebida'),
    recipientId: 'example-recipientId-1',
    ...override,
  });
}
