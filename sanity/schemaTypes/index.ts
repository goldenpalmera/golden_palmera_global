import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from "./home/homePage";
import { product } from "./products/product";
import { productsPage } from "./products/productsPage";
import { blogPost } from './blogPost';
import { author } from './author';
import { approach } from './approach'
import { inquiry } from "./inquiry";
import { contact } from "./contact";
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

    product,
    productsPage,

    blogPost,
    author,

    service,
    servicesPage,

    approach,

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
    floatingButtons,

    siteSettings,
    link,
    seo,
  ],
}
