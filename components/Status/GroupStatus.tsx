import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import MemberStatus from "./MemberStatus";
import { Link2Icon } from "lucide-react";

// type Props = {};
export type MemberCardProps = {
  fullname: string;
  email: string;
  profilePicture: string;
  readiness: "ready" | "busy";
};

export const profileCardDummyData: MemberCardProps[] = [
  {
    fullname: "Emily Dawson",
    email: "emily.dawson@company.be",
    profilePicture: "https://picsum.photos/200/300?random=1",
    readiness: "ready",
  },
  {
    fullname: "Jack Gartic",
    email: "jack.gartic@company.be",
    profilePicture: "https://picsum.photos/200/300?random=2",
    readiness: "busy",
  },
  {
    fullname: "Sophia Riley",
    email: "sophia.riley@company.be",
    profilePicture: "https://picsum.photos/200/300?random=3",
    readiness: "ready",
  },
  {
    fullname: "Michael Thompson",
    email: "michael.thompson@company.be",
    profilePicture: "https://picsum.photos/200/300?random=4",
    readiness: "busy",
  },
  {
    fullname: "Olivia Green",
    email: "olivia.green@company.be",
    profilePicture: "https://picsum.photos/200/300?random=5",
    readiness: "ready",
  },
  {
    fullname: "Liam Johnson",
    email: "liam.johnson@company.be",
    profilePicture: "https://picsum.photos/200/300?random=6",
    readiness: "ready",
  },
  {
    fullname: "Emma Watson",
    email: "emma.watson@company.be",
    profilePicture: "https://picsum.photos/200/300?random=7",
    readiness: "busy",
  },
  {
    fullname: "Noah Brown",
    email: "noah.brown@company.be",
    profilePicture: "https://picsum.photos/200/300?random=8",
    readiness: "ready",
  },
  {
    fullname: "Ava Lewis",
    email: "ava.lewis@company.be",
    profilePicture: "https://picsum.photos/200/300?random=9",
    readiness: "busy",
  },
  {
    fullname: "Ethan Smith",
    email: "ethan.smith@company.be",
    profilePicture: "https://picsum.photos/200/300?random=10",
    readiness: "ready",
  },
  {
    fullname: "Isabella Jones",
    email: "isabella.jones@company.be",
    profilePicture: "https://picsum.photos/200/300?random=11",
    readiness: "busy",
  },
  {
    fullname: "Mason Taylor",
    email: "mason.taylor@company.be",
    profilePicture: "https://picsum.photos/200/300?random=12",
    readiness: "ready",
  },
  {
    fullname: "Mia Harris",
    email: "mia.harris@company.be",
    profilePicture: "https://picsum.photos/200/300?random=13",
    readiness: "ready",
  },
  {
    fullname: "Lucas Martin",
    email: "lucas.martin@company.be",
    profilePicture: "https://picsum.photos/200/300?random=14",
    readiness: "busy",
  },
  {
    fullname: "Harper Wilson",
    email: "harper.wilson@company.be",
    profilePicture: "https://picsum.photos/200/300?random=15",
    readiness: "ready",
  },
  {
    fullname: "James Walker",
    email: "james.walker@company.be",
    profilePicture: "https://picsum.photos/200/300?random=16",
    readiness: "busy",
  },
  {
    fullname: "Charlotte White",
    email: "charlotte.white@company.be",
    profilePicture: "https://picsum.photos/200/300?random=17",
    readiness: "ready",
  },
  {
    fullname: "Benjamin Clark",
    email: "benjamin.clark@company.be",
    profilePicture: "https://picsum.photos/200/300?random=18",
    readiness: "busy",
  },
  {
    fullname: "Amelia Hall",
    email: "amelia.hall@company.be",
    profilePicture: "https://picsum.photos/200/300?random=19",
    readiness: "ready",
  },
  {
    fullname: "Henry Adams",
    email: "henry.adams@company.be",
    profilePicture: "https://picsum.photos/200/300?random=20",
    readiness: "busy",
  },
  {
    fullname: "Ella Baker",
    email: "ella.baker@company.be",
    profilePicture: "https://picsum.photos/200/300?random=21",
    readiness: "ready",
  },
  {
    fullname: "Alexander Allen",
    email: "alexander.allen@company.be",
    profilePicture: "https://picsum.photos/200/300?random=22",
    readiness: "busy",
  },
  {
    fullname: "Avery Scott",
    email: "avery.scott@company.be",
    profilePicture: "https://picsum.photos/200/300?random=23",
    readiness: "ready",
  },
  {
    fullname: "Sebastian King",
    email: "sebastian.king@company.be",
    profilePicture: "https://picsum.photos/200/300?random=24",
    readiness: "busy",
  },
  {
    fullname: "Grace Perez",
    email: "grace.perez@company.be",
    profilePicture: "https://picsum.photos/200/300?random=25",
    readiness: "ready",
  },
  {
    fullname: "Carter Wood",
    email: "carter.wood@company.be",
    profilePicture: "https://picsum.photos/200/300?random=26",
    readiness: "busy",
  },
  {
    fullname: "Scarlett Long",
    email: "scarlett.long@company.be",
    profilePicture: "https://picsum.photos/200/300?random=27",
    readiness: "ready",
  },
  {
    fullname: "Wyatt Sanders",
    email: "wyatt.sanders@company.be",
    profilePicture: "https://picsum.photos/200/300?random=28",
    readiness: "busy",
  },
  {
    fullname: "Hannah Lee",
    email: "hannah.lee@company.be",
    profilePicture: "https://picsum.photos/200/300?random=29",
    readiness: "ready",
  },
  {
    fullname: "Elijah Bell",
    email: "elijah.bell@company.be",
    profilePicture: "https://picsum.photos/200/300?random=30",
    readiness: "busy",
  },
];

const GroupStatus = () => {
  return (
    <div>
      {" "}
      <div className=" mt-10 items-center space-y-4  text-center">
        {" "}
        <span>It&apos;s time to invite your members </span>
        <Button
          className=" font-bold text-primary shadow-none border-primary border-2 "
          variant={"outline"}
        >
          Copy Link <Link2Icon />
        </Button>
        <Card className=" w-full   h-[417px]  p-3 space-y-3 overflow-y-scroll bg-gray-50 border border-primary  items-center  shadow-md shadow-primary rounded-[20px]">
          {profileCardDummyData.map((item, index) => (
            <MemberStatus member={item} key={`member_status_${index}`} />
          ))}
        </Card>
        <Button className="font-bold">Generate</Button>
        <Button className="font-bold shadow-none" variant={"link"}>
          Change your choices
        </Button>
      </div>
    </div>
  );
};

export default GroupStatus;
