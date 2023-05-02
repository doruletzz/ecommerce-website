import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
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
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      validation: (rule) =>
        rule.greaterThan(0).lessThan(100).error('Value must be between 0 and 100'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {
        type: 'category',
      },
    }),
    defineField({
      name: 'image',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {
            type: 'variant',
          },
        },
      ],
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'string',
    }),
  ],
})
