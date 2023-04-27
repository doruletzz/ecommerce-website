import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'variant',
  title: 'Variant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('A name is required'),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule) => rule.required().error('A code is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'object',
      fields: [
        defineField({type: 'string', name: 'name', title: 'Name'}),
        defineField({type: 'string', name: 'value', title: 'Value'}),
      ],
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'amount_left',
      title: 'Amount Left',
      type: 'number',
    }),
  ],
})
