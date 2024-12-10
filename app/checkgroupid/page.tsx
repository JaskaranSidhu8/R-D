import { checkCodeAndInsertUser } from "@/actions/functions";

export default async function Page() {
  // Example hardcoded IDs
  const groupcode = "101";

  // Call the function and log the result
  const result = await checkCodeAndInsertUser(groupcode);
  console.log(result);

  return null; // No HTML needed, function runs on the server
}
