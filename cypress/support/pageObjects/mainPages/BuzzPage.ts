export default class BuzzPage{
    elements = {
        postText: () => cy.get('textarea'),
        postBTN: () => cy.get('button').contains('Post')
    }

    URLs = {
        page: '/web/index.php/buzz/viewBuzz'
    }

    actions = {
        enterPostText: (text: string) => this.elements.postText().type(text),
        post: () => this.elements.postBTN().click()
    }

    postBuzz = (text: string) => {
        this.actions.enterPostText(text);
        this.actions.post();
    }

    visitPage = () => {
        cy.visit(this.URLs.page);
    }
}