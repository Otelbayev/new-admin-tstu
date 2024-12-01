import Additionals from "../additionals-edit";

const Create = () => (
  <Additionals
    title="Ilmiy Faoliyat O'zgartirish"
    updUrl="/personexperience/updatepersonexperience"
    updUrlTrans="/personexperience/updatepersonexperiencetranslation"
    createTrans="/personexperience/createpersonexperiencetranslation"
    byId="/personexperience/getbyidpersonexperience"
    byIdTrans="/personexperience/getbyidpersonexperiencetranslationuzid"
    uzId="person_experience_id"
  />
);

export default Create;
