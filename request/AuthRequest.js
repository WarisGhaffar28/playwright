const { APIUtils } = require('../actions/APIUtils');
const { auth, token } = require('../objects/authRequest');

class AuthRequest{
    constructor(){
        this.apiActions = new APIUtils;
    }

    async loginUser() {
        this.apiActions.setPayload(auth);
        this.apiActions.setHeaders({
            "Content-Type": "application/json"
        })
        this.res = await this.apiActions.post('/auth');
        this.resBody = await this.res.json();
    }

    async validateStatusCode(){
        this.apiActions.expectToBeTrue(this.res.ok);
        this.apiActions.expectStatus(this.res.status(), 200);
    }

    async getTokenFromResponse(){
        this.apiActions.expectPropertyInResponse(this.resBody, "token");
        this.token = this.resBody.token;
        this.apiActions.clearHeaders();
        // this.apiActions.setHeaders(
        //     {
        //         "Content-Type": "application/json",
        //         "Cookie": `token=${this.token}`
        //     }
        // )
        return this.token;
    }
}

module.exports = {
    AuthRequest
}