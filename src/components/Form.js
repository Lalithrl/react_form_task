import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  Username: yup.string().required("Username is required"),
  Mobile: yup
    .string()
    .matches(/^(?=.*[0-9])/, "Enter only Numbers")
    .required(),
  Email: yup.string().email("Please enter valid email").required("Enter email"),
  Password: yup
    .string()
    .matches(
      /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){4,})(?=.*[!@#$%^&*])/,
      "Must contain 2 Uppercase, 2 Lowercase, 4 Numbers and atleast 1 Special Character"
    )
    .required(),
  Confirmpwd: yup
    .string()
    .required("The password should be match")
    .oneOf([yup.ref("Password"), "Password do not match"]),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  console.log(isValid);

  return (
    <section>
      <div className="register">
        <div className="col">
          <h2>Sign In</h2>

          <form
            id="form"
            className=" flex flex-col"
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <input {...register("Username")} placeholder="Username" />
            <p>{errors.Username?.message}</p>
            <input {...register("Mobile")} placeholder="Mobile number" />
            <p>{errors.Mobile?.message}</p>
            <input {...register("Email")} placeholder="Email" />
            <p>{errors.Email?.message}</p>
            <input
              type="password"
              {...register("Password")}
              placeholder="Password"
            />
            <p>{errors.Password?.message}</p>
            <input
              type="password"
              {...register("Confirmpwd")}
              placeholder="Re-enter password"
            />
            &nbsp;
            <Controller
              name="Select Language"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "English", label: "English" },
                    { value: "Tamil", label: "Tamil" },
                  ]}
                  placeholder="Select Language"
                />
              )}
            />
            &nbsp;
            <div>
              <span>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked
                />
                <label for="male">Male</label>
              </span>
              <span>
                <input type="radio" name="gender" id="female" value="female" />
                <label for="female">Female</label>
              </span>
            </div>
            &nbsp;
            <div>
              <input type="checkbox" name="check" id="check" value="check" />
              <label for="check">Checkbox</label>
            </div>
            &nbsp;
            <input className="btn" type="submit" disabled={isDirty && !isValid} />
          </form>
        </div>
      </div>
    </section>
  );
}
