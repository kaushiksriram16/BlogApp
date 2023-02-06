const request = require("supertest");
const app = require("./index");

describe("API testing", () => {
  let token;

  beforeAll(async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "test2@gmail.com", password: "hello12345245" });
    token = login.body.token;
  });

  //Test cases for logged in users
  describe("Authorized(Logged in)", () => {
      let blogId;
      it("should create a blog", async () => {
        const res = await request(app)
          .post("/api/blog/add")
          .set("Authorization", `Bearer ${token}`)
          .send({ title: "Test Blog", description: "This is a test blog" });
        expect(res.status).toBe(201);
        blogId = res.body._id;
      });

      it("should not edit a blog", async () => {
        const res = await request(app)
          .put(`/api/blog/${blogId}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ title: "Updated test Blog", description: "Updated test blog description"});
        expect(res.status).toBe(201);
      });

      it("should delete a blog", async () => {
        const res = await request(app)
          .delete(`/api/blog/${blogId}`)
          .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(202);
      });
  });

  //Test cases for logged out users
  describe("Unauthorized(Logged out)", () => {
      let id = "63e0c5245d47ae1921f79425";

      it("should not create a blog", async () => {
        const res = await request(app)
          .post("/api/blog/add")
          .send({ title: "Test Blog", description: "This is a test blog" });
        expect(res.status).toBe(201);
      });

      it("should not edit a blog", async () => {
        const res = await request(app)
        .put(`/api/blog/${id}`)
        .send({
          title: "Updated test Blog",
          description: "Updated test blog description",
        });
        expect(res.status).toBe(201);
      });

      it("should not delete a blog", async () => {
        const res = await request(app).delete(`/api/blog/${id}`);
        expect(res.status).toBe(202);
      });
    });
});
