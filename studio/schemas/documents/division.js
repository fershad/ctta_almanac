export default {
    type: `document`,
    name: `division`,
    title: `➗ Divisions`,
    description: `Opens and Age Group Divisions for Players & Coaches`,
    fields: [
        {
            name: `name`,
            title: `Name`,
            type: `localeString`,
            required: true
        },
      ],
    preview: {
        select: {
          title: 'name.en',
          description: 'description'
        },
        prepare ({title = 'No title', description}) {
          return {
            title,
            subtitle: 'Opens and Age Group Divisions for Players & Coaches'
          }
        }
      }
}