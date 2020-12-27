import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { AiFillEye } from 'react-icons/ai'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel fontSize={15} htmlFor={field.name}>{label}</FormLabel>
            <Input fontSize={15} {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};