import React, { useCallback, useEffect, useState } from 'react';
import JXG from 'jsxgraph'; // Import JSXGraph
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, TextFieldProps } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Shape } from './enums';
import FormCmp from './FormCmp';
import { RectangleElementProps, rectangleObj } from './elements/rectangle';
import { ElementProps, Point, ShapeElement } from './types';
import { IShapElementProps, iShapeObj } from './elements/ishape';
import Results from './Results';

const elemsMap: { [key: string]: ShapeElement<IShapElementProps | RectangleElementProps> } = {
    'I-Shape': iShapeObj,
    'Rectangle': rectangleObj,
};

const JSXGraphBoard = () => {
    const [type, setType] = useState<string>(Shape.IShape);
    const [shape, setShape] = useState<ShapeElement<IShapElementProps | RectangleElementProps>>();

    useEffect(() => {
        setShape(elemsMap[type]);
    }, [type])


    let board: JXG.Board;

    useEffect(() => {
        // Create a JSXGraph board when the component is mounted
        board = JXG.JSXGraph.initBoard('jxgbox', {
            boundingbox: [-20, 20, 20, -20],
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

        const JSXpoints = shape?.elements[0]?.points?.map((point: Point) => (
            board.create('point', [point.x, point.y], { name: '', size: 0 })
        )) || [];
        board.create('polygon', JSXpoints, {
            borders: { strokeColor: 'blue', strokeWidth: 2 },
            fillColor: 'lightblue',
            fillOpacity: 0.5,
            hasInnerPoints: true
        });

        // Clean up the board when the component is unmounted
        return () => {
            JXG.JSXGraph.freeBoard(board);
        };
    }, [type, shape]);

    // move to helper file
    const getFormData = useCallback((form: Array<TextFieldProps>) => form.reduce((acc, field) => {
        return { ...acc, [field?.name || '']: field.value };
    }, {}), []);

    const changeParamsHandler = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e?.target as HTMLInputElement;
        const name = target.name;
        const inputValue = target.value;

        // improve
        const updatedForm = shape?.form?.map((field: TextFieldProps) => {
            if (field.name === name) {
                return { ...field, type: 'number', value: Number(inputValue) }
            }

            return { ...field };
        }) || [];
        const formValuesObj = getFormData(updatedForm);

        const updatedPoints = shape?.calculateParams(formValuesObj as ElementProps);
        setShape(shape => (
            shape ? {
                ...shape,
                type: type, form: updatedForm,
                elements: [{
                    type: 'polygon',
                    points: updatedPoints as Array<Point>,
                }],
                calculateParams: shape?.calculateParams,
                calculateGeometricalCharacteristics: shape?.calculateGeometricalCharacteristics,
            } : undefined));
    };

    const calculateCharacteristicsHandler = () => {
        shape?.calculateGeometricalCharacteristics(getFormData(shape?.form) as ElementProps)
        setShape(() => shape ? ({
            ...shape,
            type: shape?.type || '',
            form: shape.form,
            calculateParams: shape?.calculateParams,
            calculateGeometricalCharacteristics: shape?.calculateGeometricalCharacteristics,
        }) : undefined)

    }

    return (
        <Box sx={{ background: '#D7ADDB' }}>

            <Container sx={{ minHeight: '100vh', background: '#fff' }}>
                <Grid container sx={{ minHeight: 'inherit' }} spacing={4}>
                    <Grid alignSelf="flex-start" mt={3} size={4}>
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
                                <MenuItem value={Shape.Rectangle}>Rectangle</MenuItem>
                                <MenuItem value={Shape.circle}>Circle</MenuItem>
                                <MenuItem value={Shape.IShape}>I-Shape</MenuItem>
                            </Select>
                        </FormControl>
                        {shape?.form && <Stack sx={{ width: '100%' }} spacing={3}>
                            <FormCmp fields={shape?.form} changeHandler={changeParamsHandler} />
                            <Box mt={2} textAlign={"right"}>
                                <Button variant="contained" onClick={calculateCharacteristicsHandler}>Calculate</Button>
                            </Box>
                            <Results geometricalCharacteristics={shape?.geometricalCharacteristics} />
                        </Stack>}

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
