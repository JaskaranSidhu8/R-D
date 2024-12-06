import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users2Icon } from "lucide-react";

type Props = {
  item: any;
};

const GroupItemCard = (props: Props) => {
  const { item } = props;
  return (
    <Card className="bg-transparent  h-full border-primary shadow-primary border-2 shadow-md">
      <CardContent className=" pt-2 gap-3 h-full flex flex-col justify-center items-start">
        <h4 className=" text-sm font-bold"> {item.groups.name} </h4>
        <h5 className="  items-center flex flex-row gap-1 text-sm font-bold">
          <Users2Icon /> {item.groups.id}
        </h5>
        <div className="flex flex-col gap-0">
          <p className=" text-tiny "> {item.groups.location}</p>
          <span className=" text-tiny text-muted-foreground">
            {item.groups.created_at}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupItemCard;
