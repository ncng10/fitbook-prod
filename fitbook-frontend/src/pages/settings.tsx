import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri';
import PageHeaders from '../components/MobileViews/PageHeaders';
import UserAvatarUpload from '../components/MobileViews/UserAvatarUpload'
import { withApollo } from '../utils/withApollo';
import NextLink from "next/link";
interface SettingsProps {

}

const Settings: React.FC<SettingsProps> = ({ }) => {
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
        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Settings)