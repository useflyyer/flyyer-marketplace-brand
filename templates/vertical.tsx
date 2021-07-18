import React, {useRef} from 'react';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {proxy} from '@flyyer/proxy';
import {useImageAsCanvas, usePalette, useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logoipsum.png';
import example from '../static/example-horizontal.jpeg';

import {Layer} from '../components/layers';
import {Positions} from '../components/positions';
import {RGB_TO_HEX} from '../components/utils';

/**
 * Export to enable variables UI on Flyyer.io
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

  position: V.EnumKeys(Positions, {
    default: 'BottomLeft',
    examples: Object.keys(Positions)
  })
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

  const [cropped, errorCrop] = useSmartcrop(
    {src: proxy(image)},
    {width, height, minScale: 1}
  );
  if (errorCrop) {
    console.error(errorCrop);
  }

  // TODO: Make code more easy to understand, this was code in a rush.

  return (
    <Layer className={clsx({'flyyer-ready': Boolean(cropped)})}>
      <Layer>
        {cropped && (
          <img className="w-full h-full object-cover" src={cropped} />
        )}
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
          style={{backgroundColor: color || 'white', width: '100vh'}}
        >
          <img
            ref={logoRef}
            src={proxy(logo)}
            crossOrigin=""
            className={clsx('h-full w-auto object-contain')}
          />
        </div>
      </Layer>
    </Layer>
  );
}
