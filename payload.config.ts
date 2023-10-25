import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path';
import Users from "./cms/collections/Users";
import Posts from "./cms/collections/Posts";
import Projects from "./cms/collections/Projects";
import Technologies from "./cms/collections/Technologies";
import Media from "./cms/collections/Media";
import { webpackBundler } from '@payloadcms/bundler-webpack';

// Import UI overrides
import Icon from "./cms/adminui/Icon";
import Logo from "./cms/adminui/Logo";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - igLab'
    },
    components: {
      graphics: {
        Logo,
        Icon
      },
    },
  },
  serverURL: 'http://localhost:3000',
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [
    Posts,
    Projects,
    Technologies,
    Users,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  }
})