import {Logo} from './components/Logo';

export default {
  logo: Logo,
  project: {
    link: 'https://github.com/Workday/canvas-icons',
  },
  docsRepositoryBase:
    'https://github.com/Workday/canvas-icons/tree/main/packages/canvas-icons-docs',
  color: {
    hue: 210,
    saturation: 93,
  },
  sidebar: {
    toggleButton: true,
  },
  footer: {
    content: <p>Copyright © {new Date().getFullYear()} Workday, Inc.</p>,
  },
};
