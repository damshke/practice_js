import * as React from 'react';

import { Formik, FormikHelpers } from 'formik';
// import Button from '../Button';

const Form = ({
    values,
    handleSubmit,
}: {
    values: Object;
    handleSubmit: ((values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>) & ((values: any) => void);
}) => <Formik initialValues={values} onSubmit={handleSubmit} />;

export default Form;
