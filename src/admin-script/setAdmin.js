const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function setAdmin() {
  const uid = "l9QN7eaBDqgXmwlOp9FfWImWgAU2";

  await admin.auth().setCustomUserClaims(uid, {
    role: "admin",
  });

  const user = await admin.auth().getUser(uid);
}

setAdmin();
