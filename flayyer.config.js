// Created with create-flayyer-app@1.18.2

const {config} = require('@flayyer/flayyer-types');
const { default: endent } = require("endent");
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLAYYER_KEY,
  deck: 'branded',

  // Optionals
  name: 'Branded',
  description: endent`
    Simple template to add your brand to images.

    Supports auto-focus on images and you can chose where to display your logo.
  `,
  homepage: "https://flayyer.com",
  license: "MIT",
  keywords: ["flayyer"],
  repository: "https://github.com/flayyer/flayyer-marketplace-brand",
  private: false, // Set to false to deploy publicly to https://flayyer.com/community
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'] // Declare supported sizes
});
