import React from 'react';
import addons, { makeDecorator, StoryContext, StoryGetter, WrapperSettings } from '@storybook/addons';

import { DECORATOR } from './constants';
import { ThemeConfig } from './models';
import parameters from './parameters';
import { getConfig } from './shared';

import { ThemeDecorator } from './decorators/react';

function wrapper(getStory: StoryGetter, context: StoryContext, { parameters }: WrapperSettings) {
  const config = getConfig(parameters as ThemeConfig);
  const channel = addons.getChannel();
  channel.emit(DECORATOR);

  return (
    <ThemeDecorator config={config}>
      {getStory(context)}
    </ThemeDecorator>
  );
}

export const withThemes = makeDecorator({ ...parameters, wrapper });

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
