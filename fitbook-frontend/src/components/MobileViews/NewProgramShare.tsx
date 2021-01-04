import { Box, Flex, IconButton } from '@chakra-ui/react';
import React from 'react'
import { RiEye2Line } from 'react-icons/ri';
import { useProgramsSharedWithMeQuery } from '../../generated/graphql';
import NextLink from "next/link"
interface NewProgramShareProps {

}

const NewProgramShare: React.FC<NewProgramShareProps> = ({ }) => {

    const { data: programsData } = useProgramsSharedWithMeQuery();
    console.log(programsData?.programsSharedWithMe)
    return (
        <React.Fragment>
            <Flex mt={5} flexDir="column" width="100%" alignItems="center" justifyContent="center">
                {programsData?.programsSharedWithMe.map((program) => (
                    <Flex ml={5} flexDir="column" flexWrap="wrap" width="100%" mb={5}>
                        <Flex flexDir="row">
                            {program.creator.username} shared a program with you
                          <NextLink href="/workout/programs/[id]" as={`/workout/programs/${program.id}`}>
                                <Box ml={2}><IconButton aria-label="view-program-link" icon={<RiEye2Line />} /></Box>
                            </NextLink>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </React.Fragment>
    );
}
export default NewProgramShare