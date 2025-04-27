// Load ENV
require("dotenv").config();
const request = require("supertest");
const { expect } = require("chai");
const bookingData = require("../data/bookingData.json"); // Data booking dari JSON file

// Global Variables
const url = process.env.BASE_URL_RESTFUL;
let token;
let bookingId;
let response;

describe("E2E Booking API Test", function () {
  // Login sebelum semua tes
  before(async function () {
    console.log("----- LOGIN Before All Tests -----");

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
    token = loginResponse.body.token;
    expect(token).to.exist;
    expect(token).to.be.a("string");
  });

  beforeEach(function () {
    console.log(`----- Running Test: ${this.currentTest.title} -----`);
    this.timeout(60000);
  });

  it("Create a new booking", async function () {
    console.log("----- CREATE BOOKING -----");

    const createResponse = await request(url)
      .post("/booking")
      .set("Accept", "*/*")
      .set("Content-Type", "application/json")
      .send(bookingData); // Pakai data dari file JSON

    console.log("Create booking status:", createResponse.status);
    console.log("Create booking body:", createResponse.body);

    expect(createResponse.status).to.equal(200);
    bookingId = createResponse.body.bookingid;
    expect(bookingId).to.exist;
    expect(bookingId).to.be.a("number");
  });

  it("Get the booking and verify data", async function () {
    console.log("----- GET BOOKING -----");

    const getResponse = await request(url)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");

    console.log("Get booking status:", getResponse.status);
    console.log("Get booking body:", getResponse.body);

    expect(getResponse.status).to.equal(200);
    expect(getResponse.body.firstname).to.equal(bookingData.firstname);
    expect(getResponse.body.lastname).to.equal(bookingData.lastname);
    expect(getResponse.body.totalprice).to.equal(bookingData.totalprice);
    expect(getResponse.body.depositpaid).to.equal(bookingData.depositpaid);
  });

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

  afterEach(function () {
    console.log(`----- Finished Test: ${this.currentTest.title} -----`);
    if (response) {
      expect(response.status).to.be.oneOf([200, 201]);
    }
  });

  after(function () {
    console.log("----- All Booking Tests Completed -----");
  });
});
