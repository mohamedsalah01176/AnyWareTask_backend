import * as yup from "yup"



export const regiterBodySchema=yup.object({
  name:yup.string().min(3,'Password must be at least 3 characters').required('Name is required'),
  email: yup.string().email("Email Not Valid").required('Email is required'),
  password:yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)/,'Password must contain at least one letter and one number').required('Password is required'),
  role: yup.string().oneOf(['student', 'teacher'],"This Not Valid"),
})


export const loginBodySchema=yup.object({
  emailOrPhone:yup.string().test("email-or-phone","Invalid Phone Number Or Email",(value)=>testFunction(value as string)).required('Email is required Or Phone'),
  password:yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)/,'Password must contain at least one letter and one number').required('Password is required'),
})

const emailRGX =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const testFunction=(value:string)=>{
  return  emailRGX.test(value)
}



export const announcementBodySchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  message: yup
    .string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  createdBy: yup
    .string()
    .required("Creator ID is required"),

  expiresAt: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .test(
      "is-future",
      "Expiration date must be in the future",
      (value) => !value || value > new Date()
    ),
});



export const courseBodySchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),


  numberQuiz: yup
    .number()
    .required("Number of quizzes is required")
    .min(0, "Number of quizzes cannot be negative")
    .integer("Number of quizzes must be an integer"),

});
