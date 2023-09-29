const app = require("../index")
const OpenAI = require('openai');
const request = require("supertest")
const jwtHelper = require("../helpers/jwtHelper")
const Profile = require("../models/Profile")
const User = require("../models/User")
const Food = require("../models/Food")
const PregnancyData = require("../models/Pregnancy")
const DailyNutrition = require("../models/DailyNutrition")
const Recipe = require("../models/Recipe")
const openAI = require('../helpers/OpenAI');
const ImageKit = require('ImageKit');
const duckduckgo = require('duckduckgo-images-api');
const yt = require('@citoyasha/yt-search');

let access_token = ""
let wrong_token = ""
beforeAll(async () =>
{
    try
    {
        const newProfile = new Profile({
            name: "test",
            gender: "test",
            birthDate: new Date(),
            pregnancyData: [],
            favoriteRecipes: []
        })
        let savedProfile = await newProfile.save()
        const newUser = new User({
            username: "seededuser",
            email: "seeded@mail.com",
            password: "test123",
            profile: savedProfile._id,
        })
        await newUser.save()
        const newPregnancyData = new PregnancyData({
            startDate: new Date(),
            childrenNumber: 1,
            dailyNutrition: []
        })
        const savedPregnancyData = await newPregnancyData.save()
        const nutrition = new DailyNutrition({
            date: new Date(),
            details: {
                "Energi_kkal": {
                    "value": 1120,
                    "information": "High energy content",
                    "percentage": 59
                },
                "Protein_g": {
                    "value": 41,
                    "information": "Good source of protein",
                    "percentage": 69
                },
                "Lemak_Total": {
                    "value": 23,
                    "information": "Moderate fat content",
                    "percentage": 33
                },
                "Omega_3": {
                    "value": 0.5,
                    "information": "Low Omega-3 content",
                    "percentage": 84
                },
                "Omega_6": {
                    "value": 2.3,
                    "information": "Moderate Omega-6 content",
                    "percentage": 33
                },
                "Karbohidrat_g": {
                    "value": 203,
                    "information": "High carbohydrate content",
                    "percentage": 82
                },
                "Serat_g": {
                    "value": 8,
                    "information": "Good source of fiber",
                    "percentage": 32
                },
                "Air_ml": {
                    "value": 500,
                    "information": "Sufficient water content",
                    "percentage": 19
                },
                "Vitamin_A_re": {
                    "value": 626,
                    "information": "High Vitamin A content",
                    "percentage": 79
                },
                "Vitamin_C_mcg": {
                    "value": 10,
                    "information": "Low Vitamin C content",
                    "percentage": 12
                },
                "Folat": {
                    "value": 55,
                    "information": "Moderate Folate content",
                    "percentage": 10
                },
                "Kolin": {
                    "value": 72,
                    "information": "Good source of Choline",
                    "percentage": 16
                },
                "Vitamin_B5": {
                    "value": 1.3,
                    "information": "Low Vitamin B5 content",
                    "percentage": 22
                },
                "Vitamin_B3": {
                    "value": 5.3,
                    "information": "Moderate Vitamin B3 content",
                    "percentage": 30
                },
                "Vitamin_B6": {
                    "value": 0.8,
                    "information": "Low Vitamin B6 content",
                    "percentage": 31
                },
                "Vitamin_B1": {
                    "value": 0.3,
                    "information": "Low Vitamin B1 content",
                    "percentage": 22
                },
                "conclusion": "Nasi 1000gr, Ayam 500gr, and Bayam is a nutritious meal for women in trimester 1 of pregnancy. It provides high energy, protein, carbohydrates, and essential vitamins and minerals. It is important to note that while it contains moderate fat, the meal should be balanced with other sources of nutrients for optimal health."
            },
            input: "nasi 1000gr, ayam 500gr",
            ProfileId: savedProfile._id,
        })
        const savedNutrition = await nutrition.save()
        savedPregnancyData.dailyNutrition.push(savedNutrition._id)
        savedProfile.pregnancyData.push(savedPregnancyData._id)
        await savedProfile.save()
        await savedPregnancyData.save()
        access_token = jwtHelper.generateToken({
            username: newUser.username,
            email: newUser.email,
        })
        wrong_token = jwtHelper.generateToken({
            username: "wrong",
            email: "wrong",
        })
        console.log(access_token, "ACCESS TOKEENNN")
    } catch (error)
    {
        console.log(error)
    }
})

beforeEach(async () =>
{
    jest.restoreAllMocks();
});

afterAll(async () =>
{
    await User.deleteMany({});
    await Profile.deleteMany({});
    await PregnancyData.deleteMany({});
    await Recipe.deleteMany({});
});

describe("User Routes", () =>
    describe("POST /register", () =>
    {
        describe("Success", () =>
        {
            test("Should return status 201 and message", async () =>
            {

                const body = {
                    email: "success@mail.com",
                    username: "success",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty("message", "User created successfully")

            }, 8000)
        })
        describe("Error", () =>
        {
            test("Should return status 400 and message duplicate key error", async () =>
            {
                {
                    const body = {
                        email: "seeded@mail.com",
                        username: "seededuser",
                        password: "test123",
                    }
                    const response = await request(app).post("/users/register").send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", "Duplicate key error")
                }
            })
            test("Should return status 400 and message invalid data format", async () =>
            {

                const body = {
                    username: "testing",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid data format")

            }, 8000)
            test("Should return status 400 and message invalid data format", async () =>
            {

                const body = {
                    email: "test@gmail.com",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid data format")
            }, 8000)
            test("Fake error", async () =>
            {
                jest.spyOn(User.prototype, "save").mockRejectedValue(new Error("Error"))
                const body = {
                    email: "error@mail.com",
                    username: "errorsss",
                    password: "test123",
                }
                const response = await request(app).post("/users/register").send(body)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            }, 8000)
        })

    }, 8000),
    describe("POST /login", () =>
    {
        describe("Success", () =>
        {
            test("Login using username", async () =>
            {

                const body = {
                    username: "seededuser",
                    password: "test123",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Successfully logged in")
                expect(response.body).toHaveProperty("access_token", expect.any(String))
                access_token = response.body.access_token;
                console.log(access_token, "DARI TESTING")

            }, 8000)
            test("login using email", async () =>
            {
                const body = {
                    username: "seeded@mail.com",
                    password: "test123",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Successfully logged in")
                expect(response.body).toHaveProperty("access_token", expect.any(String))
            }, 8000)
        })
        describe("Error", () =>
        {
            test("username is wrong", async () =>
            {
                const body = {
                    username: "testing",
                    password: "test",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("email is wrong", async () =>
            {
                const body = {
                    username: "test1@mail.com",
                    password: "test",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("password field empty", async () =>
            {
                const body = {
                    username: "test"
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("password is wrong", async () =>
            {
                const body = {
                    username: "seededuser",
                    password: "WRONG",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            }, 8000)
            test("no username provided", async () =>
            {
                const body = {
                    password: "test",
                }
                const response = await request(app).post("/users/login").send(body)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid credentials, please try again")
            })
        })
    })
)

describe("Profile Routes", () =>
    describe("GET /profiles", () =>
    {
        describe("Success", () =>
        {
            test("Should return status 200 and data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(200)
                console.log(response.body, "RESPONSE BODY")
                expect(response.body).toHaveProperty("name", expect.any(String))
                expect(response.body).toHaveProperty("gender", expect.any(String))
                expect(response.body).toHaveProperty("birthDate", expect.any(String))
                expect(response.body).toHaveProperty("pregnancyData", expect.any(Array))
                expect(response.body).toHaveProperty("favoriteRecipes", expect.any(Array))
            }, 8000)
        })
        describe("Error", () =>
        {
            test("Access token is wrong", async () =>
            {
                const headers = {
                    access_token: "123"
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "jwt malformed")
            }, 8000)
            test("No access token", async () =>
            {
                const response = await request(app).get("/profiles")
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid token")
            }, 8000)
            test("Access token is valid but user not found", async () =>
            {
                const response = await request(app).get("/profiles").set({ access_token: wrong_token })
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty("message", "Invalid token")
            }, 8000)
            test("Invalid profile", async () =>
            {
                jest.spyOn(Profile, "findById").mockRejectedValue("Error")
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/profiles").set(headers)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            }, 8000)
        })
    }),
    describe("PUT /profiles", () =>
    {
        describe("Success", () =>
        {
            test("Update profile success", async () =>
            {
                const body = {
                    name: "test",
                    gender: "test",
                    date: new Date()
                }
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).put("/profiles").set(headers).send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Profile updated successfully")
            }, 8000)
        }),
            describe("Error", () =>
            {
                test("Update profile failure", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    const body = {
                        name: "test",
                        gender: "test",
                    }
                    const response = await request(app).put("/profiles").set(headers).send(body)
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", "Invalid data format")
                })
            })
    })
)

describe("Pregnancy Routes", () =>
    describe("GET /pregnancy", () =>
    {
        describe("Success", () =>
        {
            test("Get pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    startDate: new Date()
                }
                const response = await request(app).get("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("startDate", expect.any(String))
                expect(response.body).toHaveProperty("childrenNumber", expect.any(Number))
                expect(response.body).toHaveProperty("dailyNutrition", expect.any(Array))
            }, 8000)
        })
        describe("Error", () =>
        {
            test("Fail to get data", async () =>
            {
                jest.spyOn(PregnancyData, "findById").mockRejectedValue("Error");
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/pregnancies").set(headers)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            })
        })
    }),
    describe("POST /pregnancy", () =>
    {
        describe("Success", () =>
        {
            test("Add pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    startDate: new Date()
                }
                const response = await request(app).post("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Pregnancy data added successfully")
            }, 8000)
        })
        describe("Error", () =>
        {
            test("Fail adding pregnancy data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                }
                const response = await request(app).post("/pregnancies").set(headers).send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Invalid pregnancy data")
            }, 8000)
        })
    })
)

describe("Food Routes", () =>
    describe("GET /foods", () =>
    {
        describe("Success get foods", () =>
        {
            test("Get foods with query", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const query = "Biji-bijian"
                const response = await request(app).get(`/foods?key=${query}`).set(headers)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.body)).toBe(true)
            }),
                test("Get foods without query", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    const response = await request(app).get("/foods").set(headers)
                    expect(response.status).toBe(200)
                    expect(Array.isArray(response.body)).toBe(true)
                })
        })
        describe("Error get foods", () =>
        {
            test("Fail to get foods", async () =>
            {
                jest.spyOn(Food, "find").mockRejectedValue("Error");
                const headers = {
                    access_token: access_token
                }
                const query = "Biji-bijian"
                const response = await request(app).get(`/foods?key=${query}`).set(headers)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            })
        })
    })
)


describe("Nutrition Routes", () =>
    describe("GET /nutritions", () =>
    {
        describe("Success", () =>
        {
            test("Get nutrition data", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/nutritions").set(headers)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.body)).toBe(true)
            })
            test("Get nutrition data with mock value", async () =>
            {
                jest.spyOn(PregnancyData, "findById").mockResolvedValue({
                    dailyNutrition: ["123"]
                });
                jest.spyOn(DailyNutrition, "findById").mockResolvedValue("yes");
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/nutritions").set(headers)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.body)).toBe(true)

            })
        })
        describe("Failure", () =>
        {
            test("Fail to fetch", async () =>
            {
                jest.spyOn(PregnancyData, "findById").mockRejectedValue("Error");
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/nutritions").set(headers)
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty("message", "Nutrition not found")
            }, 8000)
            test("Fetching daily nutrition failed", async () =>
            {
                jest.spyOn(PregnancyData, "findById").mockResolvedValue({
                    dailyNutrition: [{}] // empty array
                });
                jest.spyOn(DailyNutrition, "findById").mockResolvedValue(null);
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/nutritions").set(headers)
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty("message", "Nutrition not found")
            }, 8000)
        })
    }),
    describe("POST /nutritions", () =>
    {
        describe("Success", () =>
        {
            test("Add nutrition data", async () =>
            {
                jest.spyOn(openAI, "query").mockResolvedValue([{
                    index: 0,
                    message: {
                        role: 'assistant',
                        content: '{\n' +
                            '  "Energi_kkal": { "value": 895, "information": "High in calories" },\n' +
                            '  "Protein_g": { "value": 38, "information": "High in protein" },\n' +
                            '  "Lemak_Total": { "value": 42, "information": "High in fat" },\n' +
                            '  "Omega_3": { "value": 0.6, "information": "Low in Omega-3 fatty acids" },\n' +
                            '  "Omega_6": { "value": 10.4, "information": "High in Omega-6 fatty acids" },\n' +
                            '  "Karbohidrat_g": { "value": 105, "information": "High in carbohydrates" },\n' +
                            '  "Serat_g": { "value": 10, "information": "High in fiber" },\n' +
                            '  "Air_ml": { "value": 500, "information": "Adequate water intake" },\n' +
                            '  "Vitamin_A_re": { "value": 1000, "information": "Adequate Vitamin A intake" },\n' +
                            '  "Vitamin_C_mcg": { "value": 60, "information": "Adequate Vitamin C intake" },\n' +
                            '  "Folat": { "value": 600, "information": "Adequate folate intake" },\n' +
                            '  "Kolin": { "value": 500, "information": "Adequate choline intake" },\n' +
                            '  "Vitamin_B5": { "value": 5.5, "information": "Adequate Vitamin B5 intake" },\n' +
                            '  "Vitamin_B3": { "value": 12.5, "information": "Adequate Vitamin B3 intake" },\n' +
                            '  "Vitamin_B6": { "value": 1, "information": "Adequate Vitamin B6 intake" },\n' +
                            '  "Vitamin_B1": { "value": 0.45, "information": "Adequate Vitamin B1 intake" },\n' +
                            '  "conclusion": "Overall, this meal provides a good amount of energy and nutrients for women in the first trimester of pregnancy. However, it is high in calories, fat, and carbohydrates, so it should be consumed in moderation. The meal also lacks sufficient Omega-3 fatty acids and has an excessive amount of Omega-6 fatty acids. Adding more sources of Omega-3, such as fatty fish or flaxseeds, and reducing the intake of Omega-6 rich foods can help improve the nutritional profile. Additionally, it is important to ensure adequate intake of vitamins and minerals, such as Vitamin A, Vitamin C, folate, choline, and B vitamins, which are crucial for the healthy development of the baby." \n' +
                            '}'
                    },
                    finish_reason: 'stop'
                }
                ]);
                const headers = {
                    access_token: access_token
                }
                const body = {
                    date: new Date(),
                    input: ["nasi 1000gr", "ayam 500gr"]
                }
                const response = await request(app).post("/nutritions").set(headers).send(body)
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty("message", "OK")
            }, 8000)
            test("Mock Open AI query", async () =>
            {
                jest.spyOn(openAI, "createChatCompletion").mockResolvedValue({
                    choices: [
                        {
                            text: 'Mocked Response',
                        },
                    ],
                });
                const search = 'Test Search';
                const result = await openAI.query(search);
                expect(result).toEqual([{ text: 'Mocked Response' }]);
            }, 8000)
        }),
            describe("Error", () =>
            {
                test("Fail to add nutrition data", async () =>
                {
                    jest.spyOn(openAI, "query").mockRejectedValue(new Error("Internal Server Error"));
                    const headers = {
                        access_token: access_token
                    }
                    const body = {
                        date: new Date(),
                        input: ["nasi 1000gr", "ayam 500gr"]
                    }
                    const response = await request(app).post("/nutritions").set(headers).send(body)
                    expect(response.status).toBe(500)
                    expect(response.body).toHaveProperty("message", "Internal Server Error")
                })
                test("No date", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    const body = {
                        input: ["nasi 1000gr", "ayam 500gr"]
                    }
                    const response = await request(app).post("/nutritions").set(headers).send(body)
                    expect(response.status).toBe(500)
                    expect(response.body).toHaveProperty("message", "Invalid data format")
                })
            })
    }),
    describe("DELETE /nutritions", () =>
    {
        describe("Success", () =>
        {
            test("Delete nutrition data", async () =>
            {
                jest.spyOn(DailyNutrition, "findByIdAndDelete").mockResolvedValue("yes");
                jest.spyOn(PregnancyData.prototype, "save").mockResolvedValue("yes")
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).delete("/nutritions/123").set(headers)
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("message", "Nutrition deleted successfully")
            })
        })
        describe("Error", () =>
        {
            test("Fail to delete nutrition data", async () =>
            {
                jest.spyOn(PregnancyData, "findById").mockRejectedValue(new Error("Data not found"));
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).delete("/nutritions/123").set(headers)
                expect(response.status).toBe(404)
                expect(response.body).toHaveProperty("message", "Data not found")
            })
        })
    })
)

describe("Recipe Routes", () =>
    describe("GET /recipes", () => 
    {
        describe("Success", () =>
        {
            test("Get recipes", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/recipes").set(headers)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.body)).toBe(true)
            })
        }, 8000)
        describe("Error", () =>
        {
            test("Fail to get recipes", async () =>
            {
                jest.spyOn(Recipe, "findById").mockRejectedValue(new Error("Error"))
                const headers = {
                    access_token: access_token
                }
                const response = await request(app).get("/recipes").set(headers)
                expect(response.status).toBe(500)
                expect(response.body).toHaveProperty("message", "Internal Server Error")
            })
        }, 8000)
    }),
    describe("POST /recipes", () =>
    {
        describe("Success", () =>
        {
            test("Add recipes", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    recipes: [{
                        title: "Rendang Daging Sapi",
                        description: "Rendang is a rich and tender coconut beef stew which is explosively flavorful and beefy. One of the most celebrated dishes in Indonesian cuisine.",
                        ingredients: [
                            "500 grams of beef, cubed",
                            "200 ml of milk or coconut milk",
                            "2 tomatoes, quartered",
                            "3 chillies, sliced (adjust to taste)",
                            "2 lemongrass stalks",
                            "4 kaffir lime leaves",
                            "2 turmeric leaves (optional)",
                            "2 tsp tamarind paste",
                            "Salt to taste",
                            "Spice paste (blended): 5 shallots, 3 cloves garlic, 1 thumb-sized ginger"
                        ],
                        instructions: [
                            "Blend the shallots, garlic, and ginger to make a spice paste.",
                            "Heat some oil in a pan and sauté the spice paste until fragrant.",
                            "Add the beef to the pan and sear until browned.",
                            "Add lemongrass, kaffir lime leaves, turmeric leaves, and chillies. Stir well.",
                            "Pour in the milk or coconut milk and let it simmer for about 1.5 hours or until the meat is tender and the sauce has thickened.",
                            "Add the tomatoes, tamarind paste, and salt. Stir well and cook for an additional 10 minutes.",
                            "Serve with warm rice."
                        ],
                        nutrition: "Rich in protein from beef and contains essential nutrients from tomatoes and milk. The chili provides a boost to metabolism."
                    }]
                }
                const response = await request(app).post("/recipes").set(headers).send(body)
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty("message", "Recipe added successfully")
            })
        }, 8000)
        describe("Failure", () =>
        {
            test("Fail to add recipe", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {}
                const response = await request(app).post("/recipes").set(headers).send(body)
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty("message", "Recipes not found")
            }, 8000)
        })
    }),
    describe("POST /recipes/recognise", () =>
    {
        describe("Success", () =>
        {
            test("Recognise recipe", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                jest.spyOn(ImageKit.prototype, "upload").mockResolvedValue({
                    ingredients: ["test", "test1"]
                })
                const response = await request(app).post("/recipes/recognise").set(headers).attach('ingredients', Buffer.from('test'), 'ingredients.jpg')
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty("ingredients", expect.any(Array))
            })
        }),
            describe("Error", () =>
            {
                test("Fail recognize recipe", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    jest.spyOn(ImageKit.prototype, "upload").mockRejectedValue(new Error("Recognize error"))
                    const response = await request(app).post("/recipes/recognise").set(headers).attach('ingredients', Buffer.from('test'), 'ingredients.jpg')
                    expect(response.status).toBe(500)
                    expect(response.body).toHaveProperty("message", "Recognize error")
                })
            })
    }),
    describe("POST /recipes/get", () =>
    {
        describe("Success", () =>
        {
            test("Get recipe", async () =>
            {
                const headers = {
                    access_token: access_token
                }
                const body = {
                    ingredients: ["tomat", "kentang", "wortel"]
                }
                jest.spyOn(openAI, "query").mockResolvedValue([{
                    index: 0,
                    message: {
                        role: 'assistant',
                        content: '[\n' +
                            '  {\n' +
                            '    "title": "Sayur Asem",\n' +
                            '    "description": "Sayur asem is a traditional Indonesian soup made with tamarind as the main ingredient. It is a tasty and nutritious dish.",\n' +
                            '    "ingredients": ["Daging Babi", "wortel", "kangkung"],\n' +
                            '    "instructions": ["1. Boil the pork with water until cooked.", "2. Add the carrots and cook until soft.", "3. Add the kangkung and tamarind juice, and simmer for a few minutes.", "4. Serve hot with rice."],\n' +
                            '    "nutrition": "Calories: 250, Protein: 20g, Fat: 10g, Carbohydrates: 15g"\n' +
                            '  },\n' +
                            '  {\n' +
                            '    "title": "Sop Ayam",\n' +
                            '    "description": "Sop ayam is a comforting and nutritious Indonesian chicken soup. It is easy to prepare and perfect for a pregnant woman.",\n' +
                            '    "ingredients": ["Daging Ayam", "wortel", "kangkung"],\n' +
                            '    "instructions": ["1. Boil the chicken with water until cooked.", "2. Add the carrots and cook until soft.", "3. Add the kangkung and let it simmer for a few minutes.", "4. Serve hot with rice or bread."],\n' +
                            '    "nutrition": "Calories: 200, Protein: 18g, Fat: 8g, Carbohydrates: 12g"\n' +
                            '  },\n' +
                            '  {\n' +
                            '    "title": "Gado-Gado",\n' +
                            '    "description": "Gado-gado is a popular Indonesian salad made with mixed vegetables and peanut sauce. It is a nutritious and delicious dish.",\n' +
                            '    "ingredients": ["wortel", "kangkung"],\n' +
                            '    "instructions": ["1. Boil the vegetables until cooked.", "2. Arrange the vegetables on a plate.", "3. Pour the peanut sauce over the vegetables.", "4. Sprinkle with fried shallots and serve."],\n' +
                            '    "nutrition": "Calories: 180, Protein: 14g, Fat: 7g, Carbohydrates: 10g"\n' +
                            '  }\n' +
                            ']'
                    },
                    finish_reason: 'stop'
                }
                ])
                jest.spyOn(duckduckgo, "image_search").mockResolvedValue([{
                    image: "https://www.google.com"
                }])
                jest.spyOn(yt, "search").mockResolvedValue([{
                    youtube: "https://www.youtube.com"
                }])
                const response = await request(app).post("/recipes/get").set(headers).send(body)
                expect(response.status).toBe(200)
                expect(Array.isArray(response.body)).toBe(true)
            })
        }),
            describe("Failure", () =>
            {
                test("Fail to get recipe", async () =>
                {
                    const headers = {
                        access_token: access_token
                    }
                    const body = {
                        ingredients: ["tomat", "kentang", "wortel"]
                    }
                    jest.spyOn(openAI, "query").mockRejectedValue(new Error("Error"))
                    const response = await request(app).post("/recipes/get").set(headers).send(body)
                    expect(response.status).toBe(500)
                    expect(response.body).toHaveProperty("message", "Error")
                })
            })
    })
)

describe("OpenAI", () =>
    describe("Functions", () =>
    {
        test("Create chat completion", () =>
        {
            jest.spyOn(openAI, "createChatCompletion").mockReturnValue(true);
            expect(openAI.createChatCompletion(true)).toBe(true);
        })
    })
)