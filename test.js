import { Selector } from 'testcafe';

fixture`Getting Started`
  .page`http://127.0.0.1:8080/public/es5/`;

test('Laser', async (browser) => {
  const firstButton = await Selector(() => document
    .querySelector('#stars')
    .shadowRoot
    .querySelector('button'));

  await browser
    .click(firstButton)
    .expect(firstButton.hasClass('selected')).eql(true)
    .expect(firstButton.nextSibling().hasClass('selected')).eql(false);
});
