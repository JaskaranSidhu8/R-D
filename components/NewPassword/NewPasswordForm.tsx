import React from "react";
import { Button } from "@/components/ui/button";
import Password from "@/components/static/Password";

// this should be a form

const NewPasswordForm = () => {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-[12vh]">
      <h2 className="montserrat text-2xl mb-8">Reset your password</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-black mb-2 block">
            Current password
          </label>
          <Password name="password" />
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-2 block">
            New password
          </label>
          <Password name="password" />
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-2 block">
            Confirm new password
          </label>
          <Password name="password" />
        </div>
      </div>

      <Button className="mt-12">Save Changes</Button>
    </div>
  );
};

export default NewPasswordForm;
