import { expect, request } from "@playwright/test";

class APIUtils {
    constructor() {
        this.header = {};
        this.params = {};
        this.payload = {};
        this.request = null;
        this.response = null;
    }

    // setParams(params){
    //     this.params = {
    //         ...this.params,
    //         params
    //     }
    // }

    setParams(params) {
        this.params = params
    }

    clearParams() {
        this.params = {};
    }

    addHeaders(headers) {
        this.header = {
            ...this.header,
            ...headers
        };
    }

    setHeaders(headers) {
        this.header = headers
    }

    clearHeaders() {
        this.header = null;
    }

    setToken(token) {
        this.addHeaders(
            {
                Authorization: `Bearer ${token}`
            }
        );
    }

    // setPayload(payload = {}) {
    //     this.payload = {
    //         ...this.payload,
    //         payload
    //     };
    // }

    setPayload(payload = {}) {
        this.payload = payload
    }

    clearPayload() {
        this.payload = {};
    }

    async get(endPoint) {
        this.response = await global.__REQUEST__.get(endPoint, {
            headers: this.header,
            params: this.params
        });
        this.clearHeaders();
        this.clearPayload;
        return this.response;
    }

    async post(endPoint) {
        this.response = await global.__REQUEST__.post(endPoint, {
            data: this.payload,
            headers: this.header
        });
        return this.response;
    }

    async put(endPoint){
        this.response = await global.__REQUEST__.put(endPoint,{
            data: this.payload,
            headers: this.header
        });
        return this.response;
    }

    async handleResponse(response) {
        const status = response.status();
        const body = await response.json();

        if (status >= 200 && status < 300) {
            console.log(`✅ Success: ${status}`);
            return body;
        } else {
            console.error(`❌ Error: ${status}`);
            console.error(body);
            throw new Error(`Request failed with status ${status}: ${JSON.stringify(body)}`);
        }
    }

    expectToBeTrue(value){
        expect(value).toBeTruthy();
    }

    expectStatus(actual, expected){
        expect(actual).toBe(expected);
    }

    expectPropertyInResponse(responseBody, propertyPath, value){
        expect(responseBody).toHaveProperty(propertyPath, value)
    }

    expectPropertyInResponse(responseBody, propertyPath){
        expect(responseBody).toHaveProperty(propertyPath)
    }

    expectLengthGreaterThan(actualLength, ExpectedLength){
        expect(actualLength).toBeGreaterThan(ExpectedLength)
    }
}

module.exports = { APIUtils };