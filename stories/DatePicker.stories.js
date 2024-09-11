import { DatePicker, DatePickerWithRange } from "~/ui/date-picker";
import React from "react";

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;
const RangeTemplate = (args) => <DatePickerWithRange {...args} />;

export const Default = Template.bind({});
Default.args = {
    // Add default args here if needed
};

export const DateRange = RangeTemplate.bind({});
DateRange.args = {
    // Add range args here if needed
};
