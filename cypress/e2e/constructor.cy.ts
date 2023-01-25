import '@4tw/cypress-drag-drop';

beforeEach(() => {
  cy.visit('http://localhost:3000');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

  cy.setCookie('accessToken', 'accessTokenTest');
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('refreshTokenTest'),
  );
});

afterEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('Тесты страницы "Конструктор"', () => {
  it('Должен взять: булку, соус, главный ингредиент. Положить по очереди в заказ. Нажать кнопку "Оформить заказ". Проверить в модалке номер заказа. Закрыть модалку', () => {
    cy.get('[data-test-id="60d3b41abdacab0026a733c6"]').as('bun');
    cy.get('[data-test-id="60d3b41abdacab0026a733cd"]').as('sauce');
    cy.get('[data-test-id="60d3b41abdacab0026a733d4"]').as('main');

    cy.get('[data-test="burgerConstructor"]').as('burgerConstructor');

    cy.get('@bun').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    cy.get('@sauce').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    cy.get('@main').trigger('dragstart');
    cy.get('@burgerConstructor').trigger('drop');

    cy.contains('Оформить заказ').click();
    cy.get('[data-test="orderNumber"]', { timeout: 5000 })
      .contains('999')
      .should('exist');
    cy.get('[data-test="closeButton"]').click();
  });

  it('Дложен кликнуть на булку. Открыть модалку с детализацией, проверить название булки. Закрыть модалку', () => {
    cy.get('[data-test-id="60d3b41abdacab0026a733c6"]').click();
    cy.get('[data-test="ingredientName"]').should(
      'have.text',
      'Краторная булка N-200i',
    );
    cy.get('[data-test="closeButton"]').click();
  });
});
