import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../utils/ApiError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const postNewBlogIntoDB = async (userData: JwtPayload, payload: TBlog) => {
  payload.author = userData.id;
  const newBlog = await (await Blog.create(payload)).populate('author');
  const { _id, title, content, author } = newBlog;
  return { _id, title, content, author };
};

// Update blog content
const updateBlogByIdIntoDB = async (
  id: string,
  userData: JwtPayload,
  payload: Partial<TBlog>,
) => {
  // find blog by id
  const blog = await Blog.findById(id);

  // Throw not found error when blog not found
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check if user is not author of blog
  if (blog?.author.toString() !== userData?.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this blog',
    );
  }

  // Check blog Update content is empty Or Not
  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide data to update your blog',
    );
  }

  // Update blog in database
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  const { _id, title, content, author } = updatedBlog!;
  return { _id, title, content, author };
};

// Delete blog from database
const deletedBlogFronDB = async (id: string, userData: JwtPayload) => {
  // find blog by id
  const blog = await Blog.findById(id);

  // Throw not found error when blog not found
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  // Check user is author Or admin if not then throw unauthorized error
  if (userData.role !== 'admin' && blog?.author.toString() !== userData?.id) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this blog',
    );
  }

  // Delete blog from database
  const deletedBlog = await Blog.findByIdAndDelete(id);
  return deletedBlog;
};

export const BlogServices = {
  postNewBlogIntoDB,
  updateBlogByIdIntoDB,
  deletedBlogFronDB,
};
