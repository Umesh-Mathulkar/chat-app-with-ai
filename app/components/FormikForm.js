import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMobile,
} from "react-icons/ai";

import { BiBookReader } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";

const getIcon = (fieldName) => {
  switch (fieldName) {
    case "email":
      return <AiOutlineMail />;
    case "name":
      return <AiOutlineUser />;
    case "password":
      return <AiOutlineLock />;
    case "mobile":
      return <AiOutlineMobile />;
    case "phone":
      return <AiOutlineMobile />;
    case "standard":
      return <BiBookReader />;
    case "medium":
      return <FaLanguage />;
    default:
      return null;
  }
};

const FormikForm = ({
  fields,
  onSubmit,
  columns = 1,
  validationSchema,
  initialValues,
}) => {
  const formInitialValues =
    initialValues ||
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});

  const formValidationSchema =
    validationSchema ||
    Yup.object(
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: Yup.string().required(`${field.label} is required`),
        }),
        {}
      )
    );

  const GRID_CLASS = `grid md:grid-cols-${columns} gap-4 p-4`;
  const FIELD_CLASS = `mt-2 block w-full p-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 transition duration-300`;

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={GRID_CLASS}>
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-lg font-semibold text-indigo-800"
                >
             
                  {field.label}
                </label>
                <div className="relative">
                  {field.as === "select" ? (
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      as="select" // Use "select" directly here
                      className={FIELD_CLASS}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  ) : (
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      as={field.as ? field.as : "input"}
                      className={FIELD_CLASS}
                      onWheel={ event => event.currentTarget.blur() }
                    />
                  )}
                  {getIcon(field.name) && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-indigo-500">
                      {getIcon(field.name)}
                    </div>
                  )}
                </div>
                {touched[field.name] && errors[field.name] && (
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="mt-2 text-sm text-red-600"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-2 bg-indigo-400 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
