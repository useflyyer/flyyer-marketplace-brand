import React, {useRef} from 'react';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import {proxy} from '@flayyer/proxy';
import {useImageAsCanvas, usePalette, useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logoipsum.png';
import example from '../static/example-horizontal.jpeg';

import {Layer} from '../components/layers';
import {Positions} from '../components/positions';
import {RGB_TO_HEX} from '../components/utils';

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  image: V.Image({
    default: example,
    title: 'Background image',
    examples: [example]
  }),
  logo: V.Image({
    default: logo,
    examples: [logo]
  }),

  position: V.Optional(V.EnumKeys(Positions, {default: 'BottomLeft'}))
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function VerticalTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables} = props;

  const {
    data: {image, logo, position = ''}
  } = validator.parse(variables);

  const logoRef = useRef<HTMLImageElement | null>(null);
  const [canvas, error] = useImageAsCanvas(logoRef.current);

  const palette = usePalette(canvas, {
    x: 0,
    y: 0,
    width: 1,
    height: canvas?.height,
    size: 2
  });
  const rgb = palette && palette[0];
  const color = rgb && RGB_TO_HEX(rgb[0], rgb[1], rgb[2]);

  const cropped = useSmartcrop(proxy(image), {
    width,
    height,
    minScale: 1
  });

  // TODO: Make code more easy to understand, this was code in a rush.

  return (
    <Layer className={clsx({'flayyer-ready': cropped.status})}>
      <Layer>
        <img className="w-full h-full object-cover" src={cropped.src} />
      </Layer>
      <Layer
        className={clsx(
          'flex flex-row',
          position.includes('Top') ? 'justify-start' : 'justify-end'
        )}
      >
        <div
          className={clsx(
            'flex-none',
            'h-6 sq:h-10 story:h-14',
            'px-2 story:px-storysafe',
            'flex flex-row justify-center',
            position.includes('Top')
              ? 'origin-top-left transform rotate-90 translate-x-6 sq:translate-x-10 story:translate-x-14 '
              : 'origin-top-right transform -rotate-90 -translate-x-6 sq:-translate-x-10 story:-translate-x-14',
            position.includes('Right')
              ? 'banner:justify-end'
              : 'banner:justify-start'
          )}
          style={{backgroundColor: color || 'black', width: '100vh'}}
        >
          <img
            ref={logoRef}
            src={proxy(logo)}
            className={clsx('h-full w-auto object-contain')}
          />
        </div>
      </Layer>
    </Layer>
  );
}
