import { type CollectionConfig } from 'payload/types';
import { isValidSlug } from '../utils/validators';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      label: 'Url Slug',
      type: 'text',
      required: true,
      validate: (val) => {
        console.log(val)
        return isValidSlug(val);
      }
    },
    {
      name: 'date',
      label: 'Post Date',
      type: 'date',
      required: true
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'project',
      label: 'Project connection',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false
    },
    {
      name: 'technologies',
      label: 'Technologies in this post',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true
    }
  ]
};

export default Posts;
