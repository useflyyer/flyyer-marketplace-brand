// Created with create-flyyer-app@1.18.2

const {config} = require('@flyyer/types');
const {default: endent} = require('endent');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'branded',

  // Optionals
  name: 'Branded',
  description: endent`
    Simple template to add your brand to images.

    Supports auto-focus on images and you can chose where to display your logo.

    > Default images credits: [Photo by August de Richelieu from Pexels](https://www.pexels.com/@august-de-richelieu)
  `,
  homepage: 'https://flyyer.io',
  license: 'MIT',
  keywords: ['flyyer'],
  repository: 'https://github.com/flyyer/flyyer-marketplace-brand',
  private: false, // Set to false to deploy publicly to https://flyyer.io/community
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'] // Declare supported sizes
});
