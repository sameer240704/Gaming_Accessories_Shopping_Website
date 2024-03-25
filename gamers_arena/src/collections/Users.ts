import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users", // Collection name in lower case
  auth: true,
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      //   admin: {
      //     condition: () => false,
      //   },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
