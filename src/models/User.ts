import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz de User
interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// Definir el esquema de User
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
