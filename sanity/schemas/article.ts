import { defineType, defineField } from 'sanity'

export const articleSchema = defineType({
  name: 'article',
  title: 'Articolo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Sommario',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenuto',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Geopolitica', value: 'GEOPOLITICS' },
          { title: 'Politica', value: 'POLITICS' },
          { title: 'Economia', value: 'ECONOMY' },
          { title: 'Finanza', value: 'FINANCE' },
          { title: 'Clima', value: 'CLIMATE' },
          { title: 'Tecnologia', value: 'TECHNOLOGY' },
          { title: 'Conflitti', value: 'CONFLICT' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data pubblicazione',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autore',
      type: 'string',
      initialValue: 'Redazione',
    }),
    defineField({
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Articolo in evidenza',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      title: 'Tempo di lettura (minuti)',
      type: 'number',
      initialValue: 5,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})
