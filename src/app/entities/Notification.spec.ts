import { randomUUID } from 'crypto';
import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notitication = new Notification({
      content: new Content('Voce recebeu uma nova solicitação de amizade'),
      category: 'social',
      recipientId: randomUUID(),
    });

    expect(notitication).toBeTruthy();
  });
});
