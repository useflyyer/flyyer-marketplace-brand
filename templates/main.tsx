import React from 'react';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import {proxy} from '@flayyer/proxy';
import {useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logoipsum.png';
import example from '../static/example.jpeg';

import {Layer} from '../components/layers';

enum Positions {
  BottomRight = 'bottom-0 right-0 object-right-bottom',
  BottomLeft = 'bottom-0 left-0 object-left-bottom',
  TopRight = 'top-0 right-0 object-right-top',
  TopLeft = 'top-0 left-0 object-left-top'
}

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  image: V.Image({
    title: 'Background image URL',
    examples: [example]
  }),
  logo: V.Image({
    title: 'Logo URL',
    examples: [logo]
  }),
  logoMargin: V.Optional(
    V.Integer({
      title: 'Logo Margin',
      description: 'In pixels',
      default: 0,
      minimum: 0
    })
  ),
  position: V.Optional(V.EnumKeys(Positions, {default: 'BottomRight'}))
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables} = props;

  const {
    data: {image, logo, logoMargin, position}
  } = validator.parse(variables);

  const cropped = useSmartcrop(proxy(image), {
    width,
    height,
    minScale: 1
  });

  return (
    <Layer className={clsx({'flayyer-ready': cropped.status})}>
      <Layer>
        <img className="w-full h-full object-cover" src={cropped.src} />
      </Layer>
      {/* <Layer className="bg-gradient-to-t from-black opacity-0 banner:opacity-60" /> */}
      <Layer className="story:py-storysafe">
        <div className="relative w-full h-full">
          <img
            src={proxy(logo)}
            style={{margin: logoMargin}}
            className={clsx(
              'absolute h-10 sq:h-16 story:18 max-w-screen object-contain',
              position && Positions[position]
            )}
          />
        </div>
      </Layer>
    </Layer>
  );
}
