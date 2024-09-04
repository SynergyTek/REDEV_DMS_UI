import {Button} from '/src/components/core/Button';
import Table from "/src/components/core/Table";

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Data/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },

};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Data = {
  args: {
    primary: true,
    text: 'Button',
  },
};
