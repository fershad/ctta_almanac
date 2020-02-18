export default {
    type: 'document',
    name: 'person',
    title: '🏃 Persons',
    fields: [
        {
            name: `name`,
            title: `Full Name`,
            type: `localeString`,
            description: `Full name of the player. Don't need to include middle names.`,
            required: true
        },
        {
            name: `image`,
            title: `Image`,
            type: `image`,
            options: { hotspot: false },
            description: `Recommended image size: 300x300 pixels.`,
            required: true
        },
        {
            name: `role`,
            title: `Role`,
            type: `array`,
            of: [
              {
                type: 'string',
                options: {
                  list: [
                      {title: `Player`, value: `player`},
                      {title: `Coach`, value: `coach`},
                      {title: `Referee`, value: `referee`},
                      {title: `Support`, value: `support`},
                  ]
              },
              }
            ],
            editModal: `popover`,
            required: true
        },
        {
          name: `division`,
          title: `Teams`,
          type: `array`,
          of: [{ type: `personTeam` }],
          editModal: `popover`,
          required: true,
        },
    ],
    preview: {
        select: {
          title: 'name.en',
          role: 'role',
          media: 'image'
        },
        prepare ({title = 'No title', media, role}) {
          return {
            title,
            media,
            subtitle: role ? role && role.join(', ') : 'Missing role'
          }
        }
      }
}