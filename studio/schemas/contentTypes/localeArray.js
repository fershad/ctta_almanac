const supportedLanguages = [
    { id: "en", title: "English", isDefault: true },
    { id: "tw", title: "Chinese"  },
    // Add as many languages as you need to support
  ]

  export default {
      name: `localeArray`,
      type: `object`,
      fieldsets: [
        {
          title: "Translations",
          name: "translations",
          description: `If left empty, English text will be used.`,
          options: { collapsible: false },
        },
      ],
      fields: supportedLanguages.map(lang => ({
        title: lang.title,
        name: lang.id,
        type: "array",
        of: [{ type: `string` }],
        fieldset: lang.isDefault ? null : "translations",
      })),
  }