import { Schema, model } from 'mongoose';

import { PostSchema } from './schemas/schemas';

const postSchema = new Schema<PostSchema>(
  {
    title: { type: String, required: true },
    contents: { type: String, required: true },
    postImageUrls: Array,
    isPrivate: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
