import {defineField, defineType} from 'sanity'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Color',
          name: 'color',
          fields: [
            {type: 'string', name: 'name', title: 'Name'},
            {type: 'string', name: 'value', title: 'Value'},
          ],
        },
      ],
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
}
