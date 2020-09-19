import i18next from 'i18next';
const en = require('../../locales/en.json');
const vi = require('../../locales/vi.json');

export const I18nSetup = async () => {
    return await i18next.init({
        resources: {
            en: {
                translation: en,
            },
            vi: {
                translation: vi,
            },
        },
        nsSeparator: ':',
        keySeparator: false,
        pluralSeparator: '_',
        contextSeparator: '_',
    });
};
