module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db.collection("users").insertOne({ name: "Ann", phone: 111 });
    await db.collection("doctors").insertOne({
      name: "Den",
      spec: "Therapist",
      slots: [
        "2022-07-10, 12:00",
        "2022-07-10, 14:00",
        "2022-07-11, 12:00",
        "2022-07-11, 14:00",
        "2022-07-12, 12:00",
        "2022-07-12, 14:00",
        "2022-07-13, 12:00",
        "2022-07-13, 14:00",
        "2022-07-07, 19:00",
      ],
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db.collection("users").deleteOne({ name: "Ann", phone: 111 });
    await db.collection("doctors").deleteOne({
      name: "Den",
      spec: "Therapist",
      slots: [
        "2022-07-10, 12:00",
        "2022-07-10, 14:00",
        "2022-07-11, 12:00",
        "2022-07-11, 14:00",
        "2022-07-12, 12:00",
        "2022-07-12, 14:00",
        "2022-07-13, 12:00",
        "2022-07-13, 14:00",
        "2022-07-07, 19:00",
      ],
    });
  },
};
