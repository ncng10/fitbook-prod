import { Box } from '@material-ui/core'
import React from 'react'

interface PageHeadersProps {

}

const PageHeaders: React.FC<PageHeadersProps> = ({ ...props }) => {
    return (
        <React.Fragment>
            <Box mt={2} width="100%" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Box fontSize={24} fontWeight={700}>{props.children}</Box>
            </Box>
        </React.Fragment>
    );
}
export default PageHeaders  