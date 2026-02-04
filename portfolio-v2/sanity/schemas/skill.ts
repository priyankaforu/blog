import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "Languages", "Frameworks / Libraries", "Tools"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'name', 
              title: 'Skill Name', 
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'icon', 
              title: 'Icon URL', 
              type: 'url',
              description: 'Optional: URL to skill icon (e.g., from devicons)',
            },
          ],
          preview: {
            select: {
              title: 'name',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
})
