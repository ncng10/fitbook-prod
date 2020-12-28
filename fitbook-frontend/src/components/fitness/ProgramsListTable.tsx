import { Box, useMediaQuery } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';
import { useEmblaCarousel } from 'embla-carousel/react';
import React, { useEffect } from 'react';
import { useMyProgramsQuery } from '../../generated/graphql';
import ProgramsCarousel from '../fitness/ProgramsCarousel';
import ProgramMenu from './ProgramMenu';
const useStyles = makeStyles({
    table: {
        minWidth: 200,
    },

});

const viewportCss = {
    overflow: 'hidden',
}
const containerCss = {
    display: 'flex',
} as React.CSSProperties;
const slideCss = {
    position: 'relative',
    minWidth: '100%',
} as React.CSSProperties;

export default function ProgramsListTable() {
    const classes = useStyles();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    const { data, loading } = useMyProgramsQuery();
    const [isLargerThan600] = useMediaQuery("(min-width:600px)")
    useEffect(() => {
        if (emblaApi) {
            // Embla API is ready
        }
    }, [emblaApi])

    return (
        <Box w="100%" mt="3.5rem" display="flex" flexDirection="column">
            <Box>
                <ProgramsCarousel />
            </Box>
            <Box >
                <ProgramMenu />
            </Box>
        </Box>


    );
}
