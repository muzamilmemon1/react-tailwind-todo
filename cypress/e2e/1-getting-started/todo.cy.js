describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should add a new task', () => {
    cy.get('input[placeholder="Add a task here..."]').type('Test Task{enter}');
    cy.get('.bg-sky-100').should('contain', 'Test Task');
  });

  it('should complete a task', () => {
    cy.get('input[placeholder="Add a task here..."]').type('Test Task{enter}');
    cy.get('.material-symbols-outlined:contains("done")').click();
    cy.get('.bg-blue-500').should('contain', 'Test Task');
  });

  it('should mark a completed task as incomplete', () => {
    cy.get('input[placeholder="Add a task here..."]').type('Test Task{enter}');
    cy.get('.material-symbols-outlined:contains("done")').click(); // Mark as done
    cy.get('.material-symbols-outlined:contains("close")').click(); // Mark as incomplete
    cy.get('.bg-sky-100').should('contain', 'Test Task');
  });

  it('should remove a task', () => {
    cy.get('input[placeholder="Add a task here..."]').type('Test Task{enter}');
    cy.get('.material-symbols-outlined:contains("close")').click();
    cy.get('.bg-sky-100').should('not.exist');
  });

  it('should not add an empty task', () => {
    cy.get('input[placeholder="Add a task here..."]').type('{enter}');
    cy.get('.bg-sky-100').should('not.exist');
  });
});
