//import { importUserData } from "@/actions/functions";
//
//export const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//  e.preventDefault();
//
//  const formData = new FormData(e.currentTarget);
//
//  const userData = {
//    firstName: formData.get("firstName") as string,
//    lastName: formData.get("lastName") as string,
//    isDeleted: false,
//    created_at: new Date().toISOString(),
//    hard_constraints: null,
//  };
//  console.log("User Data to Insert:", userData);
//
//  const result = await importUserData(userData);
//
//  if (result.success) {
//    console.log("User data successfully inserted!");
//  } else {
//    console.error("Error inserting user data:", result.error);
//  }
//};