required('@testing-library/jest-dom/extend-expect');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));
