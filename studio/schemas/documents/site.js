export default {
    type: 'document',
    name: 'site',
    title: '💻 Site Settings',
    fields: [
        {
            name: `title`,
            title: `Site Title`,
            type: `localeString`,
            required: true
        },
        {
            name: `description`,
            title: `Site Description`,
            type: `localeExcerpt`,
            required: true
        },
        {
            name: `menu`,
            title: `Menu Items`,
            type: `localeArray`,
            required: true
        },
        {
            name: `sections`,
            title: `Homepage Section Headings`,
            type: `localeArray`,
            required: true
        },
    ]
}