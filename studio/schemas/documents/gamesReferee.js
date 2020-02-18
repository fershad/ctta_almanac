export default {
    name: `gamesReferee`,
    title: `Games - Referees`,
    type: `document`,
    fields: [
        {
            name: `event`,
            title: `Event`,
            type: `reference`,
            required: true,
            to: [{ type: `event` }]
        },
        {
            name: `homeTeam`,
            title: `Home Team`,
            type: `localeString`,
            required: true,
        },
        {
            name: `awayTeam`,
            title: `Away Team`,
            type: `localeString`,
            required: true,
        },
        {
            name: `division`,
            title: `Division`,
            type: `localeString`,
            required: true,
        },
        {
            name: `referee`,
            title: `CTTA Referees`,
            type: `array`,
            of: [{ 
                type: `reference`,
                to: [{ type: `person` }],
                options: {
                    filter: '$role in role',
                    filterParams: {role: 'referee'}
                  }
            }],
            required: true,
        },
    ],
    preview: {
      select: {
        division: 'division.en',
        home: 'homeTeam.en',
        away: 'awayTeam.en',
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