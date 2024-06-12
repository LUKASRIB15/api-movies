const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")
const UserCreateService = require("./userCreateService")

describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(()=>{
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be created", async ()=>{
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
  
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("token")
  })
  
  it("user should not be created if email already exists", async ()=>{
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    }
  
    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "123"
    }
  
    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
  
    await userCreateService.execute(user1)
    
    expect(async ()=>{
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError("This email already is in use by other user! Try with another email."))
  })
})