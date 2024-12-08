import { NextApiRequest, NextApiResponse } from "next";
import { createGroup } from "@/actions/functions";
import { FormData } from "formdata-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const formData = new FormData();
  formData.set("name", "Test Group via API route");
  formData.set("group_creator", "12");

  try {
    // No cast needed now since `createGroup` expects `NodeFormData`
    const data = await createGroup(formData);
    return res.status(200).json({ data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
