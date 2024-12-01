import Additionals from "../additionals";

const Portfolio = () => (
  <Additionals
    title="Portfolio"
    get="/personportfolio/getallpersonportfolioprofil"
    del="/personportfolio/deletepersonportfolio"
    edit="portfolio/edit"
  />
);

export default Portfolio;
