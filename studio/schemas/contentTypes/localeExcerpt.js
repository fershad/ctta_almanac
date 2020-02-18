const supportedLanguages = [
    { id: "en", title: "English", isDefault: true },
    { id: "tw", title: "Chinese"  },
    // Add as many languages as you need to support
  ]

  export default {
    name: "localeExcerpt",
    type: "object",
    fieldsets: [
      {
        title: "Translations",
        name: "translations",
        description: `If left blank, English text will be used.`,
        options: { collapsible: true },
      },
    ],
    fields: supportedLanguages.map(lang => ({
      title: lang.title,
      name: lang.id,
      type: "text",
      fieldset: lang.isDefault ? null : "translations",
    })),
  }