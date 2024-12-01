import Additionals from "../additionals-edit";

const Edit = () => (
  <Additionals
    title="Portfolio O'zgartirish"
    updUrl="/personportfolio/updatepersonportfolio"
    updUrlTrans="/personportfolio/updatepersonportfoliotranslation"
    createTrans="/personportfolio/createpersonportfoliotranslation"
    byId="/personportfolio/getbyidpersonportfolio"
    byIdTrans="/personportfolio/getbyidpersonportfoliotranslationuzid"
    uzId="person_portfolio_id"
  />
);

export default Edit;
