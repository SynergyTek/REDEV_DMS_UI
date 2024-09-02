import { fn } from '@storybook/test';
import { Button } from '../components/Button';
import {InputField} from "../components/Form";

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Form/Input',
  component: InputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Input = {
  args: {
    primary: true,
    label:"Input"
  },
};

export const TextArea = {
  args: {
    label:"Text Area",
    type:"textarea"
  },
};

export const Number = {
  args: {
    label:"Number",
    type:"number"
  },
};

export const Email = {
  args: {
    label:"Email",
    type:"email"
  },
};
