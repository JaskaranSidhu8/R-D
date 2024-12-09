import { fetchUserGroups, fetchUserStatusInGroup } from "@/actions/functions";
import React from "react";

export default async function Page() {
  const groupId = 1; // Replace with your desired group_id
  const data = await fetchUserStatusInGroup(groupId);

  return (
    <div>
      <h1>Users in Group</h1>
      <ul>
        {data?.map((groupUser) => (
          <li key={groupUser.id}>
            <strong>
              {groupUser.users!.firstName} {groupUser.users!.lastName}
            </strong>{" "}
            - Ready Status: {groupUser.isready ? "Ready" : "Not Ready"}
          </li>
        ))}
      </ul>
    </div>
  );
}
