import { TextField, TextFieldProps } from "@mui/material";
import { SyntheticEvent } from "react";

interface IFormCmp {
  fields: Array<Partial<TextFieldProps>>,
  changeHandler?: (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormCmp = ({ fields, changeHandler }: IFormCmp) => {
  return (
    <>
      {fields.map((value) => (
        <TextField  {...value} onChange={changeHandler} />
      ))}
    </>
  )
};

export default FormCmp;