import { AnyObject, ObjectSchema } from "yup";

export const yupValidator = <T extends AnyObject>(
    schema: ObjectSchema<T>,
    getFieldsValue: () => T
) => ({
    async validator({ field }) {
        await schema.validateSyncAt(field, getFieldsValue());
    },
});

export const getRequiredMessage = (name: string) => `${name} is required`;
