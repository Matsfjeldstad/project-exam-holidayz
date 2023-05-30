import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import Button from "../components/ui/Button";
import { useSignUpMutation } from "../store/modules/apiSlice";
import { Link } from "react-router-dom";

export default function SignupModal() {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      is_host: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required").min(6),
      name: Yup.string().required("name is required"),
    }),
    onSubmit: (values) => {
      signUp(values);
    },
  });

  const emailErrorClass =
    formik.touched.email && formik.errors.email && "border-red-500";
  const passwordErrorClass =
    formik.touched.password && formik.errors.password && "border-red-500";

  isError && console.log(error);
  return (
    <div className="mx-auto max-w-xl p-6">
      <h4 className="">Login</h4>
      <h1 className="mt-4 text-2xl font-bold">Welcome to Holidaze</h1>
      <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-lg">Name</span>
          {formik.touched.name && formik.errors.name && (
            <motion.div
              key={formik.errors.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-md bg-red-300 p-2 text-red-900"
            >
              {formik.errors.name}
            </motion.div>
          )}
          <input
            className={`rounded-md border-2 ${
              emailErrorClass ? emailErrorClass : "border-gray-300"
            } p-2`}
            type="text"
            name="name"
            placeholder="Your name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-lg">Email</span>
          {formik.touched.email && formik.errors.email && (
            <motion.div
              key={formik.errors.email}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-md bg-red-300 p-2 text-red-900"
            >
              {formik.errors.email}
            </motion.div>
          )}
          <input
            className={`rounded-md border-2 ${
              emailErrorClass ? emailErrorClass : "border-gray-300"
            } p-2`}
            type="email"
            name="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-lg">Password</span>
          {formik.touched.password && formik.errors.password && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-red-300 p-2 text-red-900"
            >
              {formik.errors.password}
            </motion.div>
          )}
          <input
            className={`rounded-md border-2 ${
              passwordErrorClass ? passwordErrorClass : "border-gray-300"
            } p-2`}
            type="password"
            name="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
          />
        </label>
        <label className="flex w-fit flex-col gap-1">
          <span className="text-lg">Is Host?</span>
          <input
            className={`h-5 w-5 checked:bg-red-100 `}
            type="checkbox"
            name="is_host"
            placeholder="Is Host?"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.is_host}
            id="is_host"
          />
        </label>
        <Button type="submit">
          {isLoading ? (
            <div
              aria-label="Loading..."
              role="status"
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                <path
                  className="fill-gray-200"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                ></path>
                <path
                  className="fill-gray-600"
                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <span className="text-lg">
        Already have an account?
        <Link href="/signup" className="font-bold underline">
          Register
        </Link>
      </span>
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-6 top-20 z-[100] flex justify-center gap-2 rounded-sm bg-red-600 p-2 text-white"
        >
          {error.message}
          <div>x</div>
        </motion.div>
      )}
    </div>
  );
}
