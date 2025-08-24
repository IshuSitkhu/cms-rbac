import dbConnect from "../lib/mongodb";
import Role from "../models/Role";
import Permission from "../models/Permission";

async function seedRoles() {
  await dbConnect();

  const allPermissions = await Permission.find();

  const adminPermissions = allPermissions.map(p => p._id);
  const editorPermissions = allPermissions
    .filter(p =>
      ["category:read","category:update","content:read","content:update"].includes(`${p.resource}:${p.action}`)
    )
    .map(p => p._id);

  const roles = [
    { name: "Admin", permissions: adminPermissions },
    { name: "Editor", permissions: editorPermissions },
    { name: "Viewer", permissions: [] }
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ name: role.name });
    if (!exists) {
      await Role.create(role);
    }
  }

  console.log("Roles seeded!");
  process.exit(0);
}

seedRoles().catch(err => {
  console.error(err);
  process.exit(1);
});
