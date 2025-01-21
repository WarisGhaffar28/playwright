const { test, request } = require("@playwright/test");
const { BookingRequest } = require("../request/BookingRequest");
const { AuthRequest } = require("../request/AuthRequest");

const bookingRequest = new BookingRequest;
const authRequest = new AuthRequest;

test.describe("Booking test cases", async () => {
    test.beforeEach(async () => {
        global.__REQUEST__ = await request.newContext();
    });

    test("Get booking by id", async () => {
        await bookingRequest.createBookingPostRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validatePostBookingRequestJsonResponse();
        await bookingRequest.getBookingId();
        await bookingRequest.getBookingByIDGetRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validateGetBookingRequestJsonResponse();
    })

    test("Get booking by filtering firstname and lastname", async () => {
        await bookingRequest.createBookingPostRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validatePostBookingRequestJsonResponse();
        await bookingRequest.getBookingId();
        await bookingRequest.filterBookingGetRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validateLengthOfResponseObject();
    })

    test("Update booking by ID", async () => {
        await bookingRequest.createBookingPostRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validatePostBookingRequestJsonResponse();
        await bookingRequest.getBookingId();
        await bookingRequest.getBookingByIDGetRequest();
        await bookingRequest.validateStatucCode();
        await bookingRequest.validateGetBookingRequestJsonResponse();
        await authRequest.loginUser();
        await authRequest.validateStatusCode();
        let token = await authRequest.getTokenFromResponse();
        await bookingRequest.updateBookingPutRequest(token);
    })
})