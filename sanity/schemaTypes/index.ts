import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from "./home/homePage";
import { product } from "./products/product";
import { productsPage } from "./products/productsPage";
import { blogPost } from './blog/blogPost';
import { blogPage } from "./blog/blogHomePage";
import { author } from './blog/author';
import { approach } from './approaches/approach'
import { inquiry } from "./inquiry";
import { contact } from "./contact/contact";
import { contactPage } from "./contact/contactPage";
import { exportBuyerPage } from "./contact/export-buyer";
import { partnershipPage } from "./contact/partnership";
import { aboutPage } from "./about/aboutPage";
import { teamMember } from "./about/team";
import { service } from './services/service';
import { servicesPage } from './services/servicesSeo';
import { advisoryBoardPage } from "./advisory-board/advisoryBoardPage";
import { advisoryBoardCta } from "./objects/pageCta";
import { eudrMilestone } from "./objects/eudrMilestone";
import { qualityTest } from "./objects/qualityTest";
import { compliancePage } from "./compliance/compliance";
import { siteSettings } from "./siteSettings";
import { link } from "./objects/link";
import { floatingButtons } from "./float-button";
import { certification } from "./objects/certification";
import { documentItem } from "./objects/documentItem";
import { seo } from './objects/seo'
import { advisoryBoardMember } from "./objects/advisoryBoardMember"
import { advisoryBoardStat } from "./objects/advisoryBoardStat"
import { caseStudy } from './objects/caseStudy';
import { testimonial } from './objects/testimonial';
import { inspectionPartner } from './objects/inspectionPartner';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePage,
    approach,

    product,
    productsPage,

    blogPage,
    blogPost,
    author,

    service,
    servicesPage,

    aboutPage,
    teamMember,

    compliancePage,

    advisoryBoardPage,
    advisoryBoardMember,
    advisoryBoardStat,
    advisoryBoardCta,

    certification,
    documentItem,
    eudrMilestone,
    qualityTest,
    testimonial,
    inspectionPartner,
    caseStudy,
    
    inquiry,
    contact,

    contactPage,
    partnershipPage,
    exportBuyerPage,

    floatingButtons,

    siteSettings,
    link,
    seo,
  ],
}
