import { Flex, Button } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
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
    });
    console.log(data)
    return (
        <React.Fragment>
            <Box mt={10} color="#3C3D66" width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Formik
                    initialValues={{ input: "" }}
                    onSubmit={async (values) => {
                        setSearch(values.input)
                    }}
                >
                    <Form>
                        <InputField

                            width={325}
                            style={{ border: '1px solid #3C3D66', borderRadius: 10 }}
                            name="input"
                            placeholder="Search..."
                            label="Username or Email"
                        />
                        <Flex width="100%" justifyContent="flex-end">
                            <Button type="submit" mt={2} borderRadius={10} bgColor="#3C3D66" color="#DADDE9">Search</Button>
                        </Flex>
                    </Form>
                </Formik>
            </Box>

            {data?.searchUsers && data?.searchUsers.id !== meData?.me.id ? //doesnt allow users to see themselves in search results
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