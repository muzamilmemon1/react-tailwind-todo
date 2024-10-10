describe("Todo App", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:5173");
    })

    it('should add a new task', ()=>{
        cy.get('input[placeholder="Add a task here..."]').type("Test Task{enter}")
    }) 
})