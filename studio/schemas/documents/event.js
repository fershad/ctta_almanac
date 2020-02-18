export default {
    name: `event`,
    title: `🏆 Events`,
    type: `document`,
    fieldsets: [
        { name: 'details', title: "Event Details"},
        { name: 'teams', title: "Games - Teams"},
        { name: 'referees', title: "Games - Referees"},
    ],
    fields: [
        {
            name: `name`,
            title: `Name`,
            type: `localeString`,
            required: true,
        },
        {
            name: `image`,
            title: `Logo`,
            type: `image`,
            options: { hotspot: false },
            description: `Recommended image size: 300x300 pixels.`,
            required: true,
            fieldset: 'details'
        },
        {
            name: `type`,
            title: `Event Type`,
            type: `string`,
            required: true,
            options: {
                list: [
                    { title: "Tournament", value: "tournament"},
                    { title: "Test Series", value: "series"},
                    { title: "Test Match", value: "match"}
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
            fieldset: 'details'
        },
        {
            name: `year`,
            title: `Event Year`,
            type: `date`,
            options: {
                dateFormat: `YYYY`
            },
            required: true,
            fieldset: 'details'
        },
        {
            name: `location`,
            title: `Location`,
            type: `localeString`,
            required: true,
            fieldset: 'details'
        },
    ],
    preview: {
        select: {
          title: 'name.en',
          media: 'logo',
          year: 'year'
        },
        prepare ({title = 'No title', media, year}) {
          return {
            title,
            media,
            subtitle: year ? year.split('-')[0] : 'Missing year'
          }
        }
      }
}