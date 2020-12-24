import React, { useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from 'next/router';
import { withApollo } from "../utils/withApollo";
import { AiOutlineEye } from "react-icons/ai";
interface registerProps { }



const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [hidePassword, setHidePassword] = useState(true);

    const showPassword = () => {
        if (hidePassword === true) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }
    const [register] = useRegisterMutation();
    return (
        <Box >
            <Formik
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({
                        variables: { options: values },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.register.user
                                },
                            });
                        },
                    });
                    if (response.data?.register.errors) {
                        //fails
                        setErrors(toErrorMap(response.data?.register.errors));
                    } else if (response.data?.register.user) {
                        //worked
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type={hidePassword ? "password" : "text"}
                            />
                            <Flex justifyContent="flex-end">
                                <AiOutlineEye onClick={showPassword} style={{ fontSize: 25, marginTop: ".5rem" }} />
                            </Flex>
                            <Flex justifyContent="center" alignItems="center" flexDirection="column" ></Flex>
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            variantColor="teal"
                        >
                            Register
            </Button>
                    </Form>
                )}
            </Formik>
        </Box >
    );
};

export default withApollo({ ssr: false })(Register);