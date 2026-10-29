// The school itself, the same in every language: name, address, e-mail,
// office hours. Texts about it are in src/locales and src/content.
const site = {
  name: 'Satzbau',
  fullName: 'Satzbau Sprachschule',
  url: 'https://satzbau.example',
  email: 'hallo@satzbau.example',
  address: {
    street: 'Lindenhof 3', // the floor is in src/locales (site.floor)
    postcode: '07999',
    city: 'Saalbrück',
  },
  // `days` names a text in src/locales (contact.monThu, contact.fri)
  officeHours: [
    { days: 'monThu', hours: '9:00–19:00' },
    { days: 'fri', hours: '9:00–14:00' },
  ],
};

export default site;
