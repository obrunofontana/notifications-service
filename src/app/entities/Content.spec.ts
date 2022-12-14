import { Content } from './Content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma nova solicitação de amizade');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('123')).toThrow();
  });

  it('should not be able to create a notification content with more then 240 characters', () => {
    expect(() => new Content('1'.repeat(241))).toThrow();
  });
});
