import { Box, Button } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router'
import { withApollo } from '../utils/withApollo';
interface loginProps {

}

const Login: React.FC<loginProps> = ({ }) => {
    const router = useRouter();
    const [login] = useLoginMutation()
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
                                    me: data?.login.user,
                                },
                            });
                            cache.evict({ fieldName: "posts:{}" })
                        },
                    });
                    if (response.data?.login.errors) {
                        //fails
                        setErrors(toErrorMap(response.data.login.errors));
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
                            router.push("/")
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <div className="loginFormWrapper">
                        <Form>
                            <Box mt={4} w={500} >
                                <InputField
                                    name="userNameOrEmail"
                                    placeholder="Username or Email"
                                    label="Username or Email"
                                />
                                <InputField
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                    type="password2"
                                />
                                <Box >
                                    <label>Forgot Passoword?</label>
                                </Box>
                                <Button
                                    mt={10}
                                    w={250}
                                    ml={115}
                                    isLoading={isSubmitting}
                                    type="submit">Login
                                    </Button>
                            </Box>
                        </Form>
                    </div>)}
            </Formik>
        </React.Fragment >
    );
}

export default withApollo({ ssr: false })(Login);