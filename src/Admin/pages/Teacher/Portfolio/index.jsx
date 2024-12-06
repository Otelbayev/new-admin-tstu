import Additionals from "../additionals";

const Portfolio = () => (
  <Additionals
    title="Portfolio"
    get="/personportfolio/getallpersonportfolioprofil"
    del="/personportfolio/deletepersonportfolio/"
    create="/admin/portfolio/create"
  />
);

export default Portfolio;
