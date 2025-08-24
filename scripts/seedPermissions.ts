import dbConnect from "../lib/mongodb";
import Permission from "../models/Permission";

async function seedPermissions() {
  await dbConnect();

  const permissions = [
    "category:create",
    "category:read",
    "category:update",
    "category:delete",
    "content:create",
    "content:read",
    "content:update",
    "content:delete",
  ];

  for (const perm of permissions) {
    const [resource, action] = perm.split(":");
    const exists = await Permission.findOne({ resource, action });
    if (!exists) {
      await Permission.create({ resource, action });
    }
  }

  console.log("Permissions seeded!");
  process.exit(0);
}

seedPermissions().catch((err) => {
  console.error(err);
  process.exit(1);
});
