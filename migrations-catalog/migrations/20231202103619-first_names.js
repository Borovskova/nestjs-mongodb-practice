module.exports = {
  async up(db, client) {
    await db
      .collection('users')
      .updateMany({}, [
        { $set: { lastNames: ['$lastName'] } },
        { $unset: 'lastName' },
      ]);
  },

  async down(db, client) {
    await db
      .collection('users')
      .updateMany({}, [
        { $set: { lastName: { $first: '$lastNames' } } },
        { $unset: 'lastNames' },
      ]);
  },
};
