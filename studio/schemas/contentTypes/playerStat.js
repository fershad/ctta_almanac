export default {
  name: `playerStat`,
  title: `Player Stats`,
  type: `object`,
  fields: [{
      name: `playerName`,
      title: `Player Name`,
      type: `reference`,
      to: [{
        type: `person`
      }],
      options: {
        filter: ({
          document
        }) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.division) {
            return {
              filter: 'role == $role',
              params: {
                role: 'player'
              }
            }
          }

          return {
            filter: '$role in role &&  $division match division[].division._ref',
            params: {
              role: 'player',
              division: document.division._ref,
              year: document.gameDate.split('-')[0] + "-01-01"
            }
          }
        }
      }
    },
    {
      name: `touchdowns`,
      title: `Touchdowns`,
      type: `number`,
      required: false,
      validation: Rule => Rule.integer().min(0).error('Should be a whole number greater than or equal to 0.')
    },
    {
      name: `assists`,
      title: `Touchdown Assists`,
      type: `number`,
      required: false,
      validation: Rule => Rule.integer().min(0).error('Should be a whole number greater than or equal to 0.')
    },
    {
      name: `periodofTime`,
      title: `Period of Time`,
      type: `boolean`,
      required: false,
      options: {
        layout: `checkbox`
      }
    },
    {
      name: `sendOff`,
      title: `Send Off`,
      type: `boolean`,
      required: false,
      options: {
        layout: `checkbox`
      }
    },
  ],
  preview: {
    select: {
      title: 'playerName.name.en',
      media: 'playerName.image',
      touchdowns: 'touchdowns'
    },
    prepare({
      title = 'No title',
      media,
      touchdowns
    }) {
      return {
        title,
        media,
        subtitle: touchdowns ? "Touchdowns: " + touchdowns : "No touchdowns"
      }
    }
  }
}