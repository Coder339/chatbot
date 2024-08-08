import { I18n } from 'i18n-js';
// import {getLocales} from 'react-native-localize';

import en from './locales/en.json';

const i18n = new I18n({
    ...en,
});

i18n.translations = { en };

export default i18n;