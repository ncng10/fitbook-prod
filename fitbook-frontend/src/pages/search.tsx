import { Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import BottomNavigation from '../components/MobileViews/BottomNavigation';
import PageHeaders from '../components/MobileViews/PageHeaders';
import SearchListCard from '../components/MobileViews/SearchListCard';
import { useMeQuery, useMyFriendsQuery, useSearchUsersQuery } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';
interface SearchProps {

}

const Search: React.FC<SearchProps> = ({ }) => {

    const [search, setSearch] = useState('');
    const { data: meData } = useMeQuery();
    const { data, loading } = useSearchUsersQuery({
        variables: {
            input: search
        }
    })

    return (
        <React.Fragment>
            <PageHeaders>User Search</PageHeaders>
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
                    profilePicture={data?.searchUsers?.profilePicture}
                    id={data?.searchUsers.id}
                />
                :
                null

            }
            <BottomNavigation />
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Search)