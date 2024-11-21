import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) res.status(404).json({ message: "User already created" });

    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(200).json({newUser});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "An error occurred, the user could not be created. Please try again later",
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({users, totalUsers,totalPages,currentPage: page});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching users." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Usuario not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "user not obtained" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );

    if (!user) res.status(404).json({ message: "Usuario not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).json({ message: "Usuario not found" });

    res.status(200).json({ message: "Usuario deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error deleting user" });
  }
};
