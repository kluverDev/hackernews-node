const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // 1. encrypt the User’s password using the bcryptjs library
  const password = await bcrypt.hash(args.password, 10);

  // 2. store new user record in database
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  // 3. generate js web token which is signed with our app secret
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4 return user and token
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1 retrieve an existing User record by the email
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2 compare the provided password with the one that is stored in the database
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
}

module.exports = {
  signup,
  login,
  post,
};
