import { Schema, model } from 'mongoose';

import { UserSchema } from './schemas/schemas';

const userSchema = new Schema<UserSchema>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: String,
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
