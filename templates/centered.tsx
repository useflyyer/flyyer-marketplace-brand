import React from 'react';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import {proxy} from '@flayyer/proxy';
import {useSmartcrop} from 'use-smartcrop';
import clsx from 'clsx';

import '../styles/tailwind.css';

import logo from '../static/logoipsum.png';
import example from '../static/example-centered.jpeg';

import {Layer} from '../components/layers';
import {Positions} from '../components/positions';

/**
 * Export to enable variables UI on Flayyer.com
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
