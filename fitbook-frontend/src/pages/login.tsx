import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { InputField } from '../components/InputField';
import AuthFlowCard from '../components/MobileViews/AuthFlowCard';
import { MeDocument, MeQuery, useLoginMutation, useUserProfileQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';
import NextLink from "next/link";
interface loginProps {

}

const Login: React.FC<loginProps> = ({ }) => {
    const router = useRouter();
    const [login] = useLoginMutation();
    const [hidePassword, setHidePassword] = useState(true);
    const { data } = useUserProfileQuery();
    const showPassword = () => {
        if (hidePassword === true) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    };


    useEffect(() => {
        if (data?.userProfile) {
            router.push("/profile")
        }
    });

    return (
        <React.Fragment>
            <Formik
                initialValues={{ userNameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values,
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.login.user as any
                                },
                            });
                            cache.evict({ fieldName: "me" })
                        },
                    });
                    if (response.data?.login.errors) {
                        //fails
                        setErrors(toErrorMap(response.data?.login.errors));
                    } else if (response.data?.login.user) {
                        //worked

                        //if user is logged out and tries to create
                        //a post, instead of going back to home page
                        //after logging in, it will take them to the
                        //page of creating a post
                        //only if they clicked the link to do so
                        if (typeof router.query.next === "string") {
                            router.push(router.query.next);
                        } else {
                            router.push("/profile")
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AuthFlowCard>
                        <Box color="#6A6B6D" mb={5} fontSize={25}>Login</Box>

                        <Form>
                            <Box mt={4} w={310} >
                                <Box mb={7}>
                                    <InputField
                                        style={{ height: 31, backgroundColor: "#F2F5FC", border: "none", outline: "none" }}
                                        name="userNameOrEmail"
                                        label="Username or Email"
                                    />

                                </Box>
                                <Box >
                                    <InputField
                                        style={{ height: 31, backgroundColor: "#F2F5FC", border: "none", outline: "none" }}
                                        name="password"
                                        label="Password"
                                        type={hidePassword ? "password" : "text"}
                                    />
                                </Box>
                                <Flex
                                    marginTop=".5rem"
                                    fontSize={12}
                                    ml=".25rem"
                                    justifyContent="space-between">
                                    <p>Forgot Password?</p>
                                    <AiOutlineEye onClick={showPassword} style={{ fontSize: 20 }} />
                                </Flex>
                                <Flex justifyContent="center" alignItems="center" flexDirection="column" >
                                    <Button
                                        mt={12}
                                        w={215}
                                        h={35}
                                        borderRadius={15}
                                        bgColor="#74B4D9"
                                        color="#F2F5FC"
                                        fontWeight={500}
                                        isLoading={isSubmitting}
                                        type="submit">
                                        Login
        </Button>
                                    <NextLink href="/register">
                                        <Box
                                            mt={3}
                                            color="#6A6B6D"
                                        >Create an Account</Box>
                                    </NextLink>
                                </Flex>
                            </Box>
                        </Form>
                    </AuthFlowCard>
                )}
            </Formik>
        </React.Fragment >
    );
}

export default withApollo({ ssr: false })(Login);