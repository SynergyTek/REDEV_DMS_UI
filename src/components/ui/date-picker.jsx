import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/ui/form";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/ui/select";
import { ScrollArea } from "~/ui/scroll-area";
import { toast } from "sonner";


export function DatePicker({ className }, ref) {
    const [date, setDate] = React.useState(undefined);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    value={date && format(date, "yyyy-MM-dd")}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export function DatePickerWithRange({ className }, ref) {
    const [date, setDate] = React.useState();

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        value={date ? `${format(date.from, "yyyy-MM-dd")} - ${format(date.to, "yyyy-MM-dd")}` : ""}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

const FormSchema = z.object({
    datetime: z.date().nullable(),
});

export function DatetimePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("05:00");
    const [date, setDate] = useState(null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data) {
        toast.success(`Meeting at: ${format(data.datetime, "PPP, p")}`);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="datetime"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Datetime</FormLabel>
                            <Popover open={isOpen} onOpenChange={setIsOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={`w-full font-normal ${
                                                !field.value && "text-muted-foreground"
                                            }`}
                                        >
                                            {field.value ? (
                                                `${format(field.value, "PPP")}, ${time}`
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 flex items-start" align="start">
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown"
                                        selected={date || field.value}
                                        onSelect={(selectedDate) => {
                                            const [hours, minutes] = time.split(":");
                                            selectedDate?.setHours(parseInt(hours), parseInt(minutes));
                                            setDate(selectedDate);
                                            field.onChange(selectedDate);
                                        }}
                                        onDayClick={() => setIsOpen(false)}
                                        fromYear={2000}
                                        toYear={new Date().getFullYear()}
                                        disabled={(d) =>
                                            Number(d) < Date.now() - 1000 * 60 * 60 * 24 ||
                                            Number(d) > Date.now() + 1000 * 60 * 60 * 24 * 30
                                        }
                                    />
                                    <Select
                                        defaultValue={time}
                                        onValueChange={(e) => {
                                            setTime(e);
                                            if (date) {
                                                const [hours, minutes] = e.split(":");
                                                const newDate = new Date(date.getTime());
                                                newDate.setHours(parseInt(hours), parseInt(minutes));
                                                setDate(newDate);
                                                field.onChange(newDate);
                                            }
                                        }}
                                        open={true}
                                    >
                                        <SelectTrigger className="font-normal focus:ring-0 w-[120px] my-4 mr-2">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="border-none shadow-none mr-2 fixed top-2 left-0">
                                            <ScrollArea className="h-[15rem]">
                                                {Array.from({ length: 96 }).map((_, i) => {
                                                    const hour = Math.floor(i / 4)
                                                        .toString()
                                                        .padStart(2, "0");
                                                    const minute = ((i % 4) * 15)
                                                        .toString()
                                                        .padStart(2, "0");
                                                    return (
                                                        <SelectItem key={i} value={`${hour}:${minute}`}>
                                                            {hour}:{minute}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>Set your date and time.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
