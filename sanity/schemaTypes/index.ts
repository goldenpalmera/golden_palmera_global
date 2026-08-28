import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product';
import { blogPost } from './blogPost';
import { author } from './author';
import { service } from './service';
import { commodity } from './commodity';
import { compliancePage } from './compliance';
import { advisoryBoardPage } from './advisory';
import { homePage } from './homepage'
import { seo } from './objects/seo'
import { homeService } from './homeService'
import { approach } from './approach'
import { homePageSeo } from './homeSeo'
import { aboutPage } from "./aboutPage";
import { inquiry } from "./inquiry";
import { contactSubmission} from "./contactSubmission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    blogPost,
    author,
    service,
    commodity,
    homePage,
    compliancePage,
    advisoryBoardPage,
    seo,
    homeService,
    approach,
    homePageSeo,
    aboutPage,
    inquiry,
    contactSubmission,
  ],
}
