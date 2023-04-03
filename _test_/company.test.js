const company = require("../routes/company");

const supertest = require("supertest");

test("POST /company/signup", async ()=>{
    await supertest(authserver).post("company/signup")
    .send({
        username: "superman",
        password: "123456"
    })
    .expect((res) => {
        (res.status).toEqual(200);
    })

    await supertest(authserver).post("company/login")
    .send({
        username: "superman",
        password: "123456"
    })
    .expect((res) => {
        (res.status).toEqual(400);
    })
})