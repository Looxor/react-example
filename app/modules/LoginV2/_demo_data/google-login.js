// GoogleSignin.getCurrentUser
a = [
  {
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1YjNmZWFhZDlkYjBmMzhiMWI0YWI5NDU1M2ZmMTdkZTRkZDRkNDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODU0ODU1NjIwMi10MDhoNm1yYWRzajA3ajA0N2NtbHNrNHU2NDVubWhiNi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijg4NTQ4NTU2MjAyLXFmNmtxbHRibG8zbGltNzhkNmgwOXZmbDRudHBzZHRpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExMDM0MzIxODA3NjAwNzU2NDQyIiwiZW1haWwiOiJqaW5uYWhyYWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJOYWhyYWUgSmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpRGtWT0duQnE4eVRYN1R5ZXZuSzJRNE1Ec1NmbVNoOUpYdm91ZWJBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5haHJhZSIsImZhbWlseV9uYW1lIjoiSmluIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1OTQwMjcwOTAsImV4cCI6MTU5NDAzMDY5MH0.D5OXJEd0IYYEJLRkDNegFM5be_LRDy6IPyHL33bgxM2yJ2TpCq7uPKdyPHIc6eERT12R_v4yc0J150JBQyu8Xcm1JZUdepYdumD-VekItLhkf9IlS90jHRBQ35W-NtyJZPv6zoccUvwM7mJm9GIId3flNtc9NQLk9u8ER6GkcLwUs103YTLkKEHPad2zIqyOifNdx-vjFOoEXAFQ2oVXkBCjhFR4DU_Y7oEr7H3wExp5ti2Om0hRox0IPhmqMH3F0ZHwvbOwLJYMt-Uv3Y78mqAQZXeGJwVaNLYoOFL3fiFs6z0PW0B0v9v9zpmQ6i-1Qg4HdsRa05eAuINnFuIS5g',
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    serverAuthCode: null,
    user: {
      email: 'jinnahrae@gmail.com',
      familyName: 'Jin',
      givenName: 'Nahrae',
      id: '111034321807600756442',
      name: 'Nahrae Jin',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GiDkVOGnBq8yTX7TyevnK2Q4MDsSfmSh9JXvouebA=s96-c',
    },
  },
  {
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1YjNmZWFhZDlkYjBmMzhiMWI0YWI5NDU1M2ZmMTdkZTRkZDRkNDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODU0ODU1NjIwMi10MDhoNm1yYWRzajA3ajA0N2NtbHNrNHU2NDVubWhiNi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijg4NTQ4NTU2MjAyLWVmdTBqZG5wY2gxcXNuaDAydHFtMDc1OGQyMDc2ZHE1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNzMwMjU3NTUxMjExNTA2MTg1IiwiZW1haWwiOiJqZWFubmFocmFlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiTmFocmFlIEplYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2oxQkVvWk0xcG0tdTBIQXhkM25nWlliUFVaVnRfM3NDRmY5MFgtPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5haHJhZSIsImZhbWlseV9uYW1lIjoiSmVhbiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTk0MzA3Njk5LCJleHAiOjE1OTQzMTEyOTl9.JE8w7-FDBlMUKwJOJWGdxzjpSFQScS_aeKLWuFHnAnpW-skp2RnFHMGM-O2SV9wGhtjX-hr4cx9kDMftLb5b_YK40jI9J7ov66ll9A-qcP4rnKF6-zRAS7Mw5hCvEC4uvJoPH9Z9KlhlfqcDFANFHcfo-nB8Ri34CTGmJSTsFjCdtVGKY4PEn-JG0rQb8Tg_WReEne7Qfadh0ZNUL_f8ShhFRDqZS0TTQ0Pyy5xMeU-qv0ePFWGoyZXr09ih0vsjB0MjYhq8Gy4iifGifnogsbFUm0q5UYpGBlFXCqXb7cTGrHJCuMpO_mzuqOSRFmORWtJQDCPUbGA9lCK55EVS9w',
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    serverAuthCode: null,
    user: {
      email: 'jeannahrae@gmail.com',
      familyName: 'Jean',
      givenName: 'Nahrae',
      id: '113730257551211506185',
      name: 'Nahrae Jean',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14Gj1BEoZM1pm-u0HAxd3ngZYbPUZVt_3sCFf90X-=s96-c',
    },
  },
];
