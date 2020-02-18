export default {
    name: `gamesTeam`,
    title: `🏉 Games - Team`,
    type: `document`,
    fields: [
        {
            name: `event`,
            title: `Event`,
            type: `reference`,
            required: true,
            to: [{ type: `event` }],
            validation: Rule => Rule.required()
        },
        {
            name: `division`,
            title: `Division`,
            type: `reference`,
            to: [{ type: `division`}],
            required: true,
            validation: Rule => Rule.required()
        },
        {
            name: `gameDate`,
            title: `Match Date`,
            type: `date`,
            required: true,
            validation: Rule => Rule.required()
        },
        {
            name: `taipeiScore`,
            title: `Chinese Taipei Score`,
            type: `number`,
            required: true,
            validation: Rule => Rule.required().integer().positive().error('Should be a whole number greater than or equal to 0.'),
            
        },
        {
            name: `opponent`,
            title: `Opponent`,
            type: `object`,
            
            fields: [
                {
                    name: `name`,
                    title: `Opponent Name`,
                    type: `localeString`,
                    required: true,
                },
                {
                    name: `score`,
                    title: `Opponent Score`,
                    type: `number`,
                    required: true,
                    validation: Rule => Rule.required().integer().positive().error('Should be a whole number greater than or equal to 0.')
                },
            ]
        },
        {
            name: `players`,
            title: `Players`,
            description: `Please select the players involed in this game.`,
            type: `array`,
            of: [
                {
                    type: `playerStat`
                }
            ],
            required: false,
            validation: Rule => Rule.unique()
        },
        {
            name: `coaches`,
            title: `Coaches`,
            description: `Select any coaches involved in this game.`,
            type: `array`,
            of: [
                {
                    type: `reference`,
                    to: [{type: `person`}],
                    options: {
                        filter: '$role in role',
                        filterParams: {role: 'coach'}
                      }
                }
            ],
            required: false, 
        },
    ],
    preview: {
      select: {
        division: 'division.name.en',
        opponent: 'opponent.name.en',
        media: 'event.image',
        event: 'event.name.en',
      },
      prepare ({title = 'No title', media, division, opponent, event}) {
        return {
          title: division + ' v. ' + opponent,
          media,
          subtitle: event ? event : "No event"
        }
      }
    }
}