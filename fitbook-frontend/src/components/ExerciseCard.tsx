
import { Box, IconButton } from '@chakra-ui/react';

import React from 'react'
import { AiOutlineEdit, AiOutlineInfo } from 'react-icons/ai';

interface ExerciseCardProps {
    exerciseName: string;
    id: number;
    workoutIdentity: number;
    weight: number;
    sets: number;
    reps: number;
    time: number;
    rpe: number;
    notes: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseName, id, workoutIdentity, weight, sets, reps, time, rpe, notes }) => {
    return (
        <React.Fragment>
            <Box
                width={300}
                height={100}
                borderRadius={12}
                backgroundColor="#EDF2F7"
                mt={5}
            >
                <Box
                    display="flex"
                    flexDir="row"
                >
                    <div
                        style={{
                            top: 88,
                            marginLeft: 0,
                            width: 200,
                            height: 35,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
                            borderTopRightRadius: 5,
                            backgroundColor: "#353535",
                            color: "white",
                        }}
                    >
                        <span>{exerciseName}</span>
                    </div>
                    <Box width="100%" display="flex" justifyContent="flex-end" cursor="pointer">
                        <IconButton
                            aria-label="list-of-programs-button"
                            icon={<AiOutlineEdit />}
                        />
                        <IconButton
                            aria-label="list-of-programs-button"
                            icon={<AiOutlineInfo />}
                        />
                    </Box>
                </Box>
                <div
                    style={{ marginTop: 15, marginLeft: 15, display: 'flex', flexDirection: 'row' }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <span
                            style={{ fontSize: 15 }}
                        >Weight</span>
                        <span
                            style={{ fontSize: 12, fontWeight: 1000 }}
                        >{weight} LBS</span>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        ml={25}
                    >
                        <span
                            style={{ fontSize: 15 }}
                        >Sets</span>
                        <span
                            style={{ fontSize: 12, fontWeight: 1000 }}
                        >{sets}</span>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        ml={25}
                    >
                        <span
                            style={{ fontSize: 15 }}
                        >Reps</span>
                        <span
                            style={{ fontSize: 12, fontWeight: 1000 }}
                        >{reps}</span>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        ml={25}
                    >
                        <span
                            style={{ fontSize: 15 }}
                        >RPE</span>
                        <span
                            style={{ fontSize: 12, fontWeight: 1000 }}
                        >{rpe}</span>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        ml={25}
                    >
                        <span
                            style={{ fontSize: 15 }}
                        >Time</span>
                        <span
                            style={{ fontSize: 12, fontWeight: 1000 }}
                        >{time}</span>
                    </Box>
                </div>
            </Box>
        </React.Fragment >
    );
}
export default ExerciseCard