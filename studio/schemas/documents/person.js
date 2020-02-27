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
          name: `player`,
          title: `Player`,
          type: `object`,
          fields: [
            {
              name: `isPlayer`,
              description: `Please select if this person is/has been a player.`,
              type: `boolean`,
            },
            {
              name: `years`,
              title: `Years Active`,
              description: `Select the years this person has been active this role. This is required for filtering later on.`,
              type: `array`,
              of: [{ 
                type: `date`,
                name: 'year',
                title: 'Years',
                options: {
                    dateFormat: `YYYY`
                }
            }],
            options: {
              editModal: `popover`,
            },
              required: true,
            },
            {
              name: `division`,
              title: `Teams`,
              description: `For players only: Please select any teams they have played in.`,
              type: `array`,
              of: [{ type: `reference`, to: [{type: `division`}] }],
              options: {
                editModal: `popover`,
              },
              required: true,
            },
          ]
        },
        {
          name: `coach`,
          title: `Coach`,
          type: `object`,
          fields: [
            {
              name: `isCoach`,
              description: `Please select if this person is/has been a coach.`,
              type: `boolean`,
            },
            {
              name: `years`,
              title: `Years Active`,
              description: `Select the years this person has been active in this role. This is required for filtering later on.`,
              type: `array`,
              of: [{ 
                type: `date`,
                name: 'year',
                title: 'Years',
                options: {
                    dateFormat: `YYYY`
                }
            }],
            options: {
              editModal: `popover`,
            },
              required: true,
            },
            {
              name: `division`,
              title: `Teams`,
              description: `For players only: Please select any teams they have played in.`,
              type: `array`,
              of: [{ type: `reference`, to: [{type: `division`}] }],
              options: {
                editModal: `popover`,
              },
              required: true,
            },
          ]
        },
        {
          name: `referee`,
          title: `Referee`,
          type: `object`,
          fields: [
            {
              name: `isReferee`,
              description: `Please select if this person is/has been a referee.`,
              type: `boolean`,
            },
            {
              name: `years`,
              title: `Years Active`,
              description: `Select the years this person has been active in this role. This is required for filtering later on.`,
              type: `array`,
              of: [{ 
                type: `date`,
                name: 'year',
                title: 'Years',
                options: {
                    dateFormat: `YYYY`
                }
            }],
            options: {
              editModal: `popover`,
            },
              required: true,
            },
          ]
        },
        {
          name: `support`,
          title: `Support`,
          type: `object`,
          fields: [
            {
              name: `isSupport`,
              description: `Please select if this person is/has been a player.`,
              type: `boolean`,
            },
            {
              name: `years`,
              title: `Years Active`,
              description: `Select the years this person has been active in this role. This is required for filtering later on.`,
              type: `array`,
              of: [{ 
                type: `date`,
                name: 'year',
                title: 'Years',
                options: {
                    dateFormat: `YYYY`
                }
            }],
            options: {
              editModal: `popover`,
            },
              required: true,
            },
          ]
        },
    ],
    preview: {
        select: {
          title: 'name.en',
          player: 'player',
          coach: 'coach',
          referee: 'referee',
          support: 'support',
          media: 'image'
        },
        prepare ({title = 'No title', media, player, coach, referee, support}) {
          return {
            title,
            media,
            subtitle: (player || coach || referee || support ) ? role(player, coach, referee, support) : 'Missing role'
          }
        }
      }
}

const role = (p, c, r, s) => {
  let role = ''
  
  p ? role = role + 'player, ' : role = role
  c ? role = role + 'coach, ' : role = role
  r ? role = role + 'referee, ' : role = role
  s ? role = role + 'support, ' : role = role
  
  return fixString(role)

}

const fixString = (s) => {
  if (typeof s !== 'string') return ''
  let r = s.charAt(0).toUpperCase() + s.slice(1)
  return r.substring(0, r.length - 2)
}