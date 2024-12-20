import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const postNewBlogIntoDB = async (payload: TBlog) => {
  const blog = await Blog.create(payload);
};
