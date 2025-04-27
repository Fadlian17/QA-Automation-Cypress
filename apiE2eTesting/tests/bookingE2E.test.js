// Load ENV and Dependencies
require("dotenv").config();
const request = require("supertest");
const { expect } = require("chai");
const bookingData = require("../data/bookingData.json"); // Import booking data

// Global Variables
const url = process.env.BASE_URL_RESTFUL;
let token;
let bookingId;
let response;

describe("E2E Booking API Test", function () {
  // 1. Authenticate and get token before all tests
  before(async function () {
    console.log("----- AUTHENTICATION Before All Tests -----");

    const loginResponse = await request(url)
      .post("/auth")
      .set("Content-Type", "application/json")
      .send({
        username: process.env.USERNAME_RESTFUL,
        password: process.env.PASSWORD_RESTFUL,
      });

    console.log("Login response status:", loginResponse.status);
    console.log("Login response body:", loginResponse.body);

    expect(loginResponse.status).to.equal(200);
    expect(loginResponse.body).to.have.property("token");

    token = loginResponse.body.token;
    console.log("✅ Token didapat:", token);
  });

  // Hook before each test
  beforeEach(function () {
    console.log(`----- Running Test: ${this.currentTest.title} -----`);
    this.timeout(60000);
  });

  // a. Create Booking
  it("Create a new booking", async function () {
    console.log("----- CREATE BOOKING -----");

    const createResponse = await request(url)
      .post("/booking")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(bookingData);

    console.log("Create booking status:", createResponse.status);
    console.log("Create booking body:", createResponse.body);

    expect(createResponse.status).to.equal(200);
    expect(createResponse.body).to.have.property("bookingid");

    bookingId = createResponse.body.bookingid;
    expect(bookingId).to.exist;
    expect(bookingId).to.be.a("number");
  });

  // b. Get Booking
  it("Get the created booking", async function () {
    console.log("----- GET BOOKING -----");

    response = await request(url)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    console.log("Get booking status:", response.status);
    console.log("Get booking body:", response.body);

    expect(response.status).to.equal(200);
    expect(response.body.firstname).to.equal(bookingData.firstname);
    expect(response.body.lastname).to.equal(bookingData.lastname);
    expect(response.body.totalprice).to.equal(bookingData.totalprice);
    expect(response.body.depositpaid).to.equal(bookingData.depositpaid);
    expect(response.body.bookingdates.checkin).to.equal(bookingData.bookingdates.checkin);
    expect(response.body.bookingdates.checkout).to.equal(bookingData.bookingdates.checkout);
    expect(response.body.additionalneeds).to.equal(bookingData.additionalneeds);
  });

  // c. Delete Booking
  it("Delete the booking", async function () {
    console.log("----- DELETE BOOKING -----");

    response = await request(url)
      .delete(`/booking/${bookingId}`)
      .set("Cookie", `token=${token}`);

    console.log("Delete booking status:", response.status);
    console.log("Delete booking body:", response.text);

    expect(response.status).to.equal(201);
    expect(response.text).to.equal("Created");
  });

  // After each test
  afterEach(function () {
    console.log(`----- Finished Test: ${this.currentTest.title} -----`);
    if (response) {
      expect(response.status).to.be.oneOf([200, 201]);
    }
  });

  // After all tests
  after(function () {
    console.log("----- All Booking Tests Completed -----");
  });
});
