import {Button, Select} from '~'

// More on how to set up src at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Data/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },

};

// More on writing src with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    text: 'Select',
    source:[
      {id: 1, value: 'One'},
      {id: 2, value: 'Two'},
      {id: 3, value: 'Three'},
      {id: 4, value: 'Four'},
    ],
  },
};
