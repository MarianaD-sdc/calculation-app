import React, { RefObject, useEffect, useRef, useState } from 'react';
import JXG, { boards, Circle, toFixed } from 'jsxgraph'; // Import JSXGraph
import { Box, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Rectangle from './Rectangle';

const RECTANGLE = 'rectangle';
const CIRCLE = 'circle';

const JSXGraphBoard = () => {
    const [rectWidth, setRectWidth] = useState(3);
    const [rectHeight, setRectHeight] = useState(4);

    const [radius, setRadius] = useState(2);

    const [coords, setCoords] = useState([0, 0]);

    const [type, setType] = useState(RECTANGLE)

    let board: JXG.Board;

    useEffect(() => {
        // Create a JSXGraph board when the component is mounted
        board = JXG.JSXGraph.initBoard('jxgbox', {
            boundingbox: [-10, 10, 10, -10],
            axis: true,
            zoom: {
                wheel: true,
                needShift: false,
            },
            pan: {
                enabled: true,
                needShift: false,
            },
            resize: {
                enabled: true,
                throttle: 100,
            }
        });

        if (type === RECTANGLE && rectHeight && rectWidth) {
            const p1A = board.create('point', [0, 0], {
                name: 'A', size: 2, label: {
                    fixed: false
                }
            });
            const p2B = board.create('point', [rectWidth, 0], { name: 'B', size: 2, });
            const p3C = board.create('point', [rectWidth, rectHeight], { name: 'C', size: 2, });
            const p4D = board.create('point', [0, rectHeight], { name: 'D', size: 2, });


            // Create the rectangle by connecting the points
            board.create('polygon', [p1A, p2B, p3C, p4D], {
                borders: { strokeColor: 'blue', strokeWidth: 2 },
                fillColor: 'lightblue',
                fillOpacity: 0.5,
                hasInnerPoints: true
            });

            board.on('move', function () {
                p2B.moveTo([rectWidth + p1A.X(), p1A.Y()]);
                p4D.moveTo([p1A.X(), rectHeight + p1A.Y()]);
                p3C.moveTo([rectWidth + p1A.X(), rectHeight + p1A.Y()]);
            });

            board.on('move', function () {
                if (type === RECTANGLE) {
                    setCoords([Number(p1A.X().toFixed(2)), Number(p1A.Y().toFixed(2))]);

                }
            });
        }

        if (type === CIRCLE) {
            // Create a point to be the center of the circle
            const center = board.create('point', [0, 0], { name: 'Center', size: 2 });

            // Create a circle with a center point and a radius
            board.create('circle', [center, radius], {
                strokeColor: 'blue',
                strokeWidth: 2,
                fillColor: 'lightblue',
                fillOpacity: 0.5,
                fixed: false,
                scalable: true,
            });

            board.on('move', function () {
                if (type === CIRCLE) {
                    setCoords([Number(center.X().toFixed(2)), Number(center.Y().toFixed(2))]);
                }
            });
        }


        // Handle figure movement 


        // Clean up the board when the component is unmounted
        return () => {
            JXG.JSXGraph.freeBoard(board);
        };
    }, [rectHeight, rectWidth, type, radius]);


    const RectangleForm = () => (
        <>
            <TextField
                id="outlined-number"
                label="Width"
                type="number"
                value={rectWidth}
                sx={{ mt: '30px' }}
                onChange={(e) => setRectWidth(Number(e.target.value))}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <TextField
                id="outlined-number"
                label="Height"
                type="number"
                sx={{ mt: '30px' }}
                value={rectHeight}
                onChange={(e) => setRectHeight(Number(e.target.value))}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
        </>
    )

    const CircleForm = () => (
        <>
            <TextField
                id="outlined-number"
                label="Radius"
                type="number"
                value={radius}
                sx={{ mt: '30px' }}
                onChange={(e) => setRadius(Number(e.target.value))}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
        </>
    )

    return (
        <Box sx={{ background: '#D7ADDB' }}>

            <Container sx={{ minHeight: '100vh', background: '#fff' }}>
                <Grid container sx={{ minHeight: 'inherit' }} spacing={4}>
                    <Grid alignSelf="center" size={4}>
                        <FormControl sx={{ minWidth: 120, width: '100%', mb: '30px' }}>
                            <InputLabel id="select-label">Type</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select-type"
                                value={type}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}
                                sx={{ textAlign: 'left' }}
                            >
                                <MenuItem value={RECTANGLE}>Rectangle</MenuItem>
                                <MenuItem value={CIRCLE}>Circle</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-number"
                            label="X"
                            type="number"
                            value={coords[0]}
                            sx={{ mt: '30px', width: '100%', }}
                            onChange={(e) => setCoords([Number(e.target.value), coords[1]])}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <TextField
                            id="outlined-number"
                            label="Y"
                            type="number"
                            value={coords[1]}
                            sx={{ mt: '30px', width: '100%', }}
                            onChange={(e) => setCoords([coords[0], Number(e.target.value)])}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <Stack >
                            {type === RECTANGLE && <RectangleForm />}
                            {type === CIRCLE && <CircleForm />}
                        </Stack>
                    </Grid>

                    <Grid
                        size={8}
                        sx={{
                            '& #jxgbox_licenseText': {
                                display: 'none',
                            }
                        }}>
                        <div id="jxgbox" style={{ width: '100%', height: '100%' }}></div>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
};

export default JSXGraphBoard;
