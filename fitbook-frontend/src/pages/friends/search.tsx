import { Box } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { useSearchUsersQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

interface SearchProps {

}

const Search: React.FC<SearchProps> = ({ }) => {

    const [search, setSearch] = useState('')

    const { data, loading } = useSearchUsersQuery({
        variables: {
            input: search
        }
    })

    return (
        <React.Fragment>
            <Formik
                initialValues={{ input: "" }}
                onSubmit={async (values) => {
                    setSearch(values.input)
                }}
            >
                <Form>
                    <InputField
                        name="input"
                        placeholder="Username or Email"
                        label="Username or Email"
                    />
                    <Button type="submit">Search</Button>
                </Form>
            </Formik>

            <Box>
                Results:
                <Box>
                    <span>{data?.searchUsers.username}</span>
                    <img src={`http://localhost:5001/images/${data?.searchUsers.profilePicture}`} />
                </Box>
            </Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Search)