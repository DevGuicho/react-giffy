import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("The field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string()
    .min(8, "The password is too short")
    .required("Password is missing"),
});

export default RegisterSchema;
