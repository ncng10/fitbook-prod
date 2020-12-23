import { Avatar, Box } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { InputField } from '../../components/InputField';
import { NavBar } from '../../components/NavBar';
import SearchListCard from '../../components/SearchListCard';
import { useMeQuery, useSearchUsersQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

interface SearchProps {

}

const Search: React.FC<SearchProps> = ({ }) => {

    const [search, setSearch] = useState('')
    const { data: meData } = useMeQuery();
    const { data, loading } = useSearchUsersQuery({
        variables: {
            input: search
        }
    })

    return (
        <React.Fragment>
            <NavBar />
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
            {data?.searchUsers && data?.searchUsers.id !== meData?.me.id ?
                <SearchListCard
                    username={data?.searchUsers.username}
                    profilePicture={data?.searchUsers.profilePicture}
                    id={data?.searchUsers.id}
                />
                :
                null

            }
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Search)