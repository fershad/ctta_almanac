export default {
    name: `gamesReferee`,
    title: `👨‍⚖️ Games - Referees`,
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
          name: `gameDate`,
          title: `Match Date`,
          type: `date`,
          required: true,
          validation: Rule => Rule.required()
      },
      {
        name: `homeTeam`,
        title: `Home Team`,
        type: `object`,
        
        fields: [
            {
                name: `name`,
                title: `Team Name`,
                type: `localeString`,
                required: true,
            },
            {
                name: `score`,
                title: `Score`,
                type: `number`,
                required: true,
                validation: Rule => Rule.required().integer().positive().error('Should be a whole number greater than or equal to 0.')
            },
        ]
    },
    {
      name: `awayTeam`,
      title: `Away Team`,
      type: `object`,
      
      fields: [
          {
              name: `name`,
              title: `Team Name`,
              type: `localeString`,
              required: true,
          },
          {
              name: `score`,
              title: `Score`,
              type: `number`,
              required: true,
              validation: Rule => Rule.required().integer().positive().error('Should be a whole number greater than or equal to 0.')
          },
      ]
  },
        {
            name: `division`,
            title: `Division`,
            type: `localeString`,
            required: true,
            validation: Rule => Rule.required()
        },
        {
            name: `referee`,
            title: `CTTA Referees`,
            type: `array`,
            of: [{ 
                type: `reference`,
                to: [{ type: `person` }],
                options: {
                    filter: ({
                      document
                    }) => {
                      // Always make sure to check for document properties
                      // before attempting to use them
                      if (!document.gameDate) {
                        return {
                          filter: 'referee.isReferee'
                        }
                      }
                
                      return {
                        filter: 'referee.isReferee && $year in referee.years',
                        params: {
                          year: document.gameDate.split('-')[0] + "-01-01"
                        }
                      }
                    }
                  }
            }],
            required: true,
            validation: Rule => Rule.required()
        },
    ],
    preview: {
      select: {
        division: 'division.en',
        home: 'homeTeam.name.en',
        away: 'awayTeam.name.en',
        media: 'event.image',
        event: 'event.name.en',
      },
      prepare ({title = 'No title', media, division, home, away, event}) {
        return {
          title: home + ' v. ' + away,
          media,
          subtitle: event && division ? event + ": " + division : "No event"
        }
      }
    }
}