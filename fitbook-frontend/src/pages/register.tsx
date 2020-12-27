import React, { useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from 'next/router';
import { withApollo } from "../utils/withApollo";
import { AiOutlineEye } from "react-icons/ai";
import AuthFlowCard from "../components/MobileViews/AuthFlowCard";
import NextLink from "next/link";
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
                        router.push("/dashboard")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AuthFlowCard>
                        <Box color="#6A6B6D" mb={5} fontSize={25}>Register</Box>
                        <Box mt={4} w={310}>
                            <Form>
                                <InputField
                                    style={{ height: 31, backgroundColor: "#F2F5FC", border: "none", outline: "none" }}
                                    name="username"
                                    placeholder="username"
                                    label="Username"
                                />
                                <Box mt={4}>
                                    <InputField
                                        style={{ height: 31, backgroundColor: "#F2F5FC", border: "none", outline: "none" }}
                                        name="email"
                                        placeholder="Email"
                                        label="Email"
                                    />
                                </Box>
                                <Box mt={4}>
                                    <InputField
                                        style={{ height: 31, backgroundColor: "#F2F5FC", border: "none", outline: "none" }}
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
                                <Flex justifyContent="center" alignItems="center" flexDirection="column" >
                                    <Button
                                        mt={7}
                                        w={215}
                                        h={35}
                                        borderRadius={15}
                                        bgColor="#74B4D9"
                                        color="#F2F5FC"
                                        fontWeight={500}
                                        isLoading={isSubmitting}
                                        type="submit">
                                        Register
        </Button>
                                    <NextLink href="/login">
                                        <Box
                                            mt={2}
                                            color="#6A6B6D"
                                        >Already have an account?</Box>
                                    </NextLink>
                                </Flex>
                            </Form>
                        </Box>
                    </AuthFlowCard>
                )}
            </Formik>
        </Box >
    );
};

export default withApollo({ ssr: false })(Register);