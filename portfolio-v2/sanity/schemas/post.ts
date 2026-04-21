import { defineType, defineField } from 'sanity'
import { FaFilePdf, FaTable } from 'react-icons/fa'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary for previews',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
        {
          type: 'object',
          name: 'pdfEmbed',
          title: 'PDF Embed',
          icon: FaFilePdf,
          fields: [
            {
              name: 'file',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: '.pdf',
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Display Title',
              type: 'string',
              description: 'Optional title shown above the embedded PDF',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }: { title?: string }) {
              return {
                title: title || 'PDF Embed',
                subtitle: 'Embedded PDF document',
              }
            },
          },
        },
        {
          type: 'object',
          name: 'dataTable',
          title: 'Table',
          icon: FaTable,
          fields: [
            {
              name: 'title',
              title: 'Table Title',
              type: 'string',
              description: 'Optional heading above the table',
            },
            {
              name: 'headers',
              title: 'Column Headers',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'tableRow',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cells',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                  preview: {
                    select: { cells: 'cells' },
                    prepare({ cells }: { cells?: string[] }) {
                      return {
                        title: cells?.join(' | ') || 'Empty row',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return {
                title: title || 'Table',
                subtitle: 'Data table',
              }
            },
          },
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'Bash', value: 'bash' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
    },
  },
})
