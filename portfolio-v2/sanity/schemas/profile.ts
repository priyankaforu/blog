import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short description like "An Electrical Engineer, Mastering Computers"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      description: 'Your main bio/about text',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
      description: 'Link to your CV/Resume (Google Drive, Dropbox, etc.)',
    }),
    defineField({
      name: 'availableForWork',
      title: 'Available for Work',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'username', title: 'Username', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
