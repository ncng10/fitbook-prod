import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri';
import PageHeaders from '../components/MobileViews/PageHeaders';
import UserAvatarUpload from '../components/MobileViews/UserAvatarUpload'
import { withApollo } from '../utils/withApollo';
import NextLink from "next/link";
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../generated/graphql';
interface SettingsProps {

}

const Settings: React.FC<SettingsProps> = ({ }) => {
    const apolloClient = useApolloClient();
    const router = useRouter();
    const [logout] = useLogoutMutation();

    return (
        <React.Fragment>
            <Box width="100%" display="flex" justifyContent="flex-start">
                <NextLink href="/profile">
                    <IconButton ml={5} mt={5} aria-label="back-to-profile" icon={<RiArrowGoBackLine />} />
                </NextLink>
            </Box>
            <PageHeaders >
                User Settings
                </PageHeaders>
            <UserAvatarUpload />
            <Box onClick={async () => {
                await logout();
                apolloClient.resetStore();
                router.push("/")
            }}>Logout</Box>
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Settings)