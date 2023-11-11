import { useTranslation } from 'react-i18next';
import { Lang, Translation } from '../types/globalTypes';

const useFindTranslation = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? Lang.PL;

  const findTranslation = (translations: Translation[]) =>
    translations.find(translation => translation.lang === currentLang)?.value ?? '';

  return { findTranslation };
};

export default useFindTranslation;
