import React from 'react';
import {Variable as V, Validator, Static} from '@flyyer/variables';
import {TemplateProps} from '@flyyer/types';
import {proxy} from '@flyyer/proxy';
import {useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logoipsum.png';
import example from '../static/example-centered.jpeg';

import {Layer} from '../components/layers';
import {Positions} from '../components/positions';

/**
 * Export to enable variables UI on Flyyer.io
 */
export const schema = V.Object({
  image: V.Image({
    title: 'Background image',
    examples: [example],
    default: example
  }),
  logo: V.Image({
    examples: [logo],
    default: logo
  })
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function CenteredTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables} = props;

  const {
    data: {image, logo}
  } = validator.parse(variables);

  const [cropped, errorCrop] = useSmartcrop(
    {src: proxy(image)},
    {width, height, minScale: 1}
  );
  if (errorCrop) {
    console.error(errorCrop);
  }

  return (
    <Layer className={clsx({'flyyer-wait': !cropped})}>
      <Layer>
        {cropped && (
          <img className="w-full h-full object-cover" src={cropped} />
        )}
      </Layer>
      <Layer className="story:py-storysafe flex justify-center items-center">
        <img
          src={proxy(logo)}
          className={clsx(
            'absolute w-32 h-20 sq:w-52 sq:h-36 max-w-full object-contain object-center'
          )}
        />
      </Layer>
    </Layer>
  );
}
