import React from "react";
import Button from "./Button";

const Nav = () => {
  return (
    <nav className="flex items-center p-4 shadow-xl justify-between flex-wrap bg-slate-600">
      <h1 className="text-2xl text-shadow text-white font-bold tracking-tight">
        File Share App
      </h1>
      <div id="window-button" className="flex gap-2">
        <Button
          onClick={() => {
            window.controller.minimize();
          }}
          text={"Minimize"}
          color={"bg-blue-900"}
        />
        <Button
          onClick={() => {
            window.controller.close();
          }}
          text={"Close"}
          color={"bg-red-900"}
        />
      </div>
    </nav>
  );
};
export default Nav;
