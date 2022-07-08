module.exports = {
  async up(db, client) {
    let i = 0;
    do {
      i += 1;
      const phoneNumber = Math.trunc(Math.random() * 100000);
      const slot = new Date(
        Date.parse(
          `2022-07-08, ${Math.trunc(Math.random() * (23 - 1) + 1)}:${Math.trunc(
            Math.random() * (59 - 1) + 1
          )}`
        )
      );

      await db
        .collection("users")
        .insertMany([{ name: "Ann", phone: phoneNumber }]);
      await db.collection("doctors").insertMany([
        {
          name: "Den",
          spec: "Therapist",
          slots: [slot],
        },
      ]);

      const user = await db.collection("users").findOne({ phone: phoneNumber });
      const doctor = await db.collection("doctors").findOne({ slots: slot });

      await db
        .collection("receptions")
        .insertMany([{ user_id: user._id, doctor_id: doctor._id, slot: slot }]);
    } while (i < 10000);
  },

  async down(db, client) {
    await db.collection("users").remove({});
    await db.collection("doctors").remove({});
    await db.collection("receptions").remove({});
  },
};
