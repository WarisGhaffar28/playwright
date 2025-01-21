const { APIUtils } = require('../actions/APIUtils');
const { post_request, get_filter_params, put_updateBooking_payload } = require('../objects/bookingRequest');

class BookingRequest {
    constructor() {
        this.apiActions = new APIUtils();
    }

    async createBookingPostRequest() {
        this.apiActions.setPayload(post_request);
        this.res = await this.apiActions.post('/booking');
        this.resBody = await this.res.json();
    }

    async validateStatucCode() {
        this.apiActions.expectToBeTrue(this.res.ok());
        this.apiActions.expectStatus(this.res.status(), 200);
    }

    async validatePostBookingRequestJsonResponse() {
        this.apiActions.expectPropertyInResponse(this.resBody, "booking.firstname", post_request.firstname);
        this.apiActions.expectPropertyInResponse(this.resBody, "booking.lastname", post_request.lastname);
        this.apiActions.expectPropertyInResponse(this.resBody, "booking.bookingdates.checkin", post_request.bookingdates.checkin);
        this.apiActions.expectPropertyInResponse(this.resBody, "booking.bookingdates.checkout", post_request.bookingdates.checkout);
    }

    async getBookingId() {
        this.bookingId = this.resBody.bookingid;
    }

    async getBookingByIDGetRequest() {
        this.res = await this.apiActions.get(`booking/${this.bookingId}`);
        this.resBody = await this.res.json();
    }

    async validateGetBookingRequestJsonResponse() {
        this.apiActions.expectPropertyInResponse(this.resBody, "firstname", post_request.firstname);
        this.apiActions.expectPropertyInResponse(this.resBody, "lastname", post_request.lastname);
        this.apiActions.expectPropertyInResponse(this.resBody, "bookingdates.checkin", post_request.bookingdates.checkin);
        this.apiActions.expectPropertyInResponse(this.resBody, "bookingdates.checkout", post_request.bookingdates.checkout);
    }

    async filterBookingGetRequest() {
        this.apiActions.setParams(get_filter_params);
        this.res = await this.apiActions.get("/booking");
        this.resBody = await this.res.json();
    }

    async validateLengthOfResponseObject() {
        this.apiActions.expectLengthGreaterThan(this.resBody.length, 0);
    }

    async updateBookingPutRequest(token) {
        this.apiActions.setHeaders(
            {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        );
        this.apiActions.setPayload(put_updateBooking_payload);
        this.res = await this.apiActions.put(`/booking/${this.bookingId}`);
        this.resBody = await this.res.json();
    }
}

module.exports = { BookingRequest }