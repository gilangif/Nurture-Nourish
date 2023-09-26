const app = require("../index")
const request = require("supertest")

const User = require("../models/User")

describe("User Routes", () =>
    describe("POST /register", () =>
    {
        describe("Success", () =>
        {
            test("Should return status 201 and message", async () =>
            {
                try
                {
                    const body = {
                        email: "test@mail.com",
                        username: "test",
                        password: "test123",
                    }
                    const response = await request(app).post("/register").send(body)
                    expect(response.status).toBe(201)
                    expect(response.body).toHaveProperty("message", "User created successfully")
                    done();
                } catch (error)
                {
                    done(error)
                }
            })
        })
    }));
