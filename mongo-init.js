db.createUser({
  user: 'mongolian',
  pwd: 'supersupersecret',
  roles: [
    {
      role: 'readWrite',
      db: 'efuse',
    },
  ],
});
