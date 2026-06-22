# Routing and API with Controllers
- Create one Controller function with (req,res) as parameter which will be execute when end point hits.  {example : addUser = (req,res) => {} }
- Create a Router from express for creating categorical routing {example : userRouter }
- Pass(use) that Controller function to the userRouter specific api endpoints with certain req methods(get, post...) {example: userRouter.post("/userRegister", middlewares, addUser)}
- In server.js file create the api full path with Router for new Router only. {example : app.use("/api/user", userRouter)}
- Test the API at platforms(So, no need to have frontend)
### Api successfully created with endpoint and Tested

# Password Salting Hashing and Comparing
- Password will be recieved through post method in req.body. { Ex: {password} = req.body }
- Use bcrypt.genSalt(n) to create Salt for password and add n rounds to mix it with password { Ex : salt = bcrypt.genSalt(10) }
- Use bcrypt.hash(password, salt) to hash the password then save the hash password into data {Ex: hashPassword = bcrypt.hash(password, salt) }
- Compare the password using bcrypt.compare(password, hashPassword), this returns true or false { Ex : isMatch =  bcrypt.compare(password, hashPassword) }
### Password got Salted, Hashed and Compared


# Token Generation and Token Verification
- First compare the password using bcrypt.compare(password, hashPassword), this returns true or false { Ex : isMatch =  bcrypt.compare(password, hashPassword) }
- If Passoword matches generate a token using jwt(something, secret) [ Example : jwt.sign(onwhichbasic, JWT.SECRET)]
- Pass the token as response from the backend which on frontend side at time of api call will be saved in the localStorage or session or cookies
- To verify the token use jwt.verify(token, secret) to verify the token is authentic or not { Ex : jwt.verify(token, JWT.secret) }
### Token got Generated and Verified 




