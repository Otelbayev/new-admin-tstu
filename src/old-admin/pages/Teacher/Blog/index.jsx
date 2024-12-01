import Additionals from "../additionals";

const Blog = () => (
  <Additionals
    title="Blog"
    get="/personblog/getallpersonblogprofil"
    del="/personblog/deletepersonblog"
    edit="blog/edit"
  />
);

export default Blog;
