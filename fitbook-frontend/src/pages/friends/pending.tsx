import React from 'react'
import { withApollo } from '../../utils/withApollo';

interface PendingProps {

}

const Pending: React.FC<PendingProps> = ({ }) => {
    return (
        <React.Fragment>

        </React.Fragment>
    );
}
export default withApollo({ ssr: false })(Pending)