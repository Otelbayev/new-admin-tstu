import Additionals from "../additionals-edit";

const Edit = () => (
  <Additionals
    title="Portfolio O'zgartirish"
    updUrl="/personblog/updatepersonblog"
    updUrlTrans="/personblog/updatepersonblogtranslation"
    createTrans="/personblog/createpersonblogtranslation"
    byId="/personblog/getbyidpersonblog"
    byIdTrans="/personblog/getbyidpersonblogtranslationuzid"
    uzId="person_blog_id"
  />
);

export default Edit;
