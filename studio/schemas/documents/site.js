export default {
    type: 'document',
    name: 'site',
    title: '💻 Site Settings',
    description: 'Settings for the website. Please note that only the most recently updated record will be used.',
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
    ],
    preview: {
        select: {
            title: 'title.en',
            updated: '_updatedAt'
        },
        prepare ({title = 'No title', updated}) {

            const date = new Date(updated)
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const _updatedAt = year + '-' + month + '-' + day

            return {
                title,
                subtitle: updated ? `Updated on: ${_updatedAt}` : 'No date'
            }
        }
    }
}