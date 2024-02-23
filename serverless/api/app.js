const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./oddly-96c55-3d6a0a8a63b3.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = async (req, res) => {
  const querySnapshot = await db
    .collection("bookings")
    .doc(id)
    .collection("invoice")
    
  const chatsArray = querySnapshot.docs.map((doc) => ({
   if (paid === true) {
    schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
  }));

  res.status(200).send(chatsArray);
};
