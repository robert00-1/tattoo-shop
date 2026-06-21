import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//
// ✅ REGISTER (CLIENT ONLY - PUBLIC ROUTE)
//
export const registerUser = async (data) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,

      // ✅ ALWAYS CLIENT
      role: data.role || "CLIENT",
    },
  });

  return user;
};

//
// ✅ LOGIN (WORKS FOR BOTH ADMIN & CLIENT)
//
export const loginUser = async (data) => {
  
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
console.log("USER FROM DB:", user);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
console.log("ROLE BEING SENT TO TOKEN:", user.role);

console.log("JWT_SECRET SIGN:", process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role, // ADMIN or CLIENT
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};