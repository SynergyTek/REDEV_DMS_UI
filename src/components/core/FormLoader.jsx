import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";
import {forwardRef} from "react";

const generateSchema = (components) => {
    const schema = {};
    components?.forEach((component) => {
        const key = component.key.toLowerCase();
        switch (component.type) {
            case "textfield":
                schema[key] = z.string()
                    .min(component.validate?.minLength, {
                        message: `${component.label} must be at least ${component.validate?.minLength} characters.`,
                    })
                    .max(component.validate?.maxLength, {
                        message: `${component.label} must be at most ${component.validate?.maxLength} characters.`,
                    });
                break;
            case "email":
                schema[key] = z.string().email({
                    message: "Invalid email address.",
                });
                break;
            case "number":
                schema[key] = z.coerce.number()
                    .min(component.validate?.min, {
                        message: `${component.label} must be at least ${component.validate.min}.`,
                    })
                    .max(component.validate?.max, {
                        message: `${component.label} must be at most ${component.validate.max}.`,
                    });
                break;
            default:
                break;
        }
    });
    return z.object(schema);
};

const renderComponent = (component) => {
    switch (component.type) {
        case "textfield":
        case "email":
        case "number":
            return (
                <FormField
                    key={component.key}
                    name={component.key.toLowerCase()}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{component.label}</FormLabel>
                            <FormControl>
                                <Input type={component.type==='number' ? 'number' : 'text'} placeholder={component.label} {...field} />
                            </FormControl>
                            <FormDescription>{component.description}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        default:
            return null;
    }
};

const FormLoader = forwardRef((
    {
        jsonSchema,
        ...props
    }, ref
) => {
    const formSchema = generateSchema(jsonSchema.components);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {jsonSchema.components?.map((component) => renderComponent(component))}
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </Form>
    );
});

export default FormLoader