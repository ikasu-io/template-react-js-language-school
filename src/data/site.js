// The school itself: name, address, office hours, discounts.
const site = {
  name: 'Satzbau',
  fullName: 'Satzbau Sprachschule',
  tagline: 'German for people who live here now.',
  url: 'https://satzbau.example',
  email: 'hallo@satzbau.example',
  address: {
    street: 'Lindenhof 3, 2nd floor',
    postcode: '07999',
    city: 'Saalbrück',
  },
  officeHours: [
    { days: 'Monday to Thursday', hours: '9:00–19:00' },
    { days: 'Friday', hours: '9:00–14:00' },
  ],
  gettingHere:
    'Tram 3 or 5 to Lindenhof, then through the archway into the courtyard. Bike racks under the linden tree; no parking on site.',
  discounts: [
    'Students and apprentices: 10% off every course',
    'Book two courses in a row: 15% off the second',
    'Jobcentre and BAMF vouchers accepted for integration courses',
  ],
};

export default site;
