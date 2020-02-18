export default {
    name: `personTeam`,
    title: `Person - Divisions`,
    type: `object`,
    fields: [
        {
            name: `division`,
            title: `Division`,
            type: `reference`,
            required: true,
            to: [{type:`division`}]
        },
        {
            name: `years`,
            title: `Years`,
            type: `array`,
            required: true,
            of: [{ 
                type: `date`,
                name: 'year',
                title: 'Years',
                options: {
                    dateFormat: `YYYY`
                }
            }]
        },
    ],
    preview: {
        select: {
          title: 'division.name.en',
          years: 'years'
        },
        prepare ({title = 'No title', years}) {
            let allYears = []
            if (years) {
                years.forEach(year => {
                    allYears.push(year.split('-')[0])
                });
            }
          return {
            title,
            subtitle: allYears ? allYears && allYears.join(', ') : "Missing years"
          }
        }
      }
}