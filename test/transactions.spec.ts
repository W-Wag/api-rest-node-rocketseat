import request from "supertest"
import { afterAll, beforeAll, describe, test } from "vitest"
import { app } from "../src/app"

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  test("user can create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201)
  })

  test("user can be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 5000,
        type: "credit",
      })

    const cookies = createTransactionResponse.get("Set-Cookie")
    await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies ? cookies : [""])
      .expect(200)
  })
})
