"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CountrySelectList from "../static/CountrySelectList";
import { importUserData } from "@/actions/functions";
import { useRouter } from "next/navigation";
import PreferencesForm from "../Preferences/PreferenceForm";

// type Props = {};

const Signup2Form = () => {
  const router = useRouter();
  const onSubmit = async (e: FormData) => {
    const { success, error } = await importUserData(e);
    if (success) {
      router.push("/Home");
    }
  };

  return (
    <form
      action={(e) => {
        onSubmit(e);
      }}
      className=" space-y-5"
    >
      <Input name="firstName" type="text" placeholder="First Name" required />
      <Input name="lastName" type="text" placeholder="Last Name" required />
      <CountrySelectList name="country" />
      <Input name="city" type="text" placeholder=" City " required />

      <PreferencesForm name="preferences" />

      <Button type="submit" className=" w-full">
        {" "}
        Create your account
      </Button>
    </form>
  );
};

export default Signup2Form;
