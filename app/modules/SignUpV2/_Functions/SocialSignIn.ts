const has_provider = (socialProviders, findingProvider) =>
  socialProviders.some(provider =>
    provider.match(new RegExp(findingProvider + '$')),
  );
const has_google = socialProviders =>
  has_provider(socialProviders, 'google.com');
const has_facebook = socialProviders =>
  has_provider(socialProviders, 'facebook.com');
const has_apple = socialProviders => has_provider(socialProviders, 'apple.com');

export {has_apple, has_facebook, has_google};
